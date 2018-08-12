import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Card, Col, Row, Input, Layout, Spin } from "antd";
import "antd/dist/antd.css";

const { Search } = Input;
const { Header, Content } = Layout;
const listPosts = gql`
  query listPosts {
    singlePost(id: 456) {
      id
      title
    }
  }

  # query listPosts {
  #   matchingTitlePost(title: "Made in Dynamo") {
  #     title
  #   }
  # }
`;

class App extends Component {
  render() {
    console.log("app", this.props);
    const { items = [], isLoading } = this.props;
    return (
      <Layout>
        <Header>
          <div style={{ maxWidth: "960px", margin: "auto" }}>
            <Search
              placeholder="Post ID"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
          </div>
        </Header>
        <Content>
          <div style={{ maxWidth: "960px", margin: "50px auto" }}>
            <Row gutter={24}>
              <Col span={12}>
                {items.map(({ id, title, description }) => (
                  <Card key={id} title={title}>
                    <p>{description}</p>
                  </Card>
                ))}
              </Col>
            </Row>
            {isLoading && (
              <Row gutter={24}>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "50px 0 0"
                  }}
                >
                  <Spin />
                </Col>
              </Row>
            )}
          </div>
        </Content>
      </Layout>
    );
  }
}

// export default App;
export default graphql(listPosts, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }, props) =>
    console.log("query", data) || {
      ...props,
      items: [data.singlePost],
      isLoading: data.loading
    }
})(App);
