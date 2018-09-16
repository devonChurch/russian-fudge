import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import { Card, Input, Layout, Button, Tag } from "antd";
import upperFirst from "lodash.upperfirst";
import Section from "./Section";

const { Search } = Input;
const { Header } = Layout;

const GET_SINGLE_ITEM = gql`
  query getFoodItem($id: ID!) {
    getFoodItem(id: $id) {
      id
      category
      description
      href
      icon
      title
    }
  }
`;

class App extends Component {
  state = {
    currentId: null
  };

  render() {
    const { currentId } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div style={{ maxWidth: "960px", margin: "auto" }}>
            <Search
              placeholder="Post ID"
              enterButton="Search"
              size="large"
              onSearch={value => {
                this.setState(() => ({ currentId: value }));
              }}
            />
          </div>
        </Header>
        {/* The query need "some" kind of content e.g a single space otherwise
        the GraphQL will error out and not recover (as am ID is required). */}
        <Query query={GET_SINGLE_ITEM} variables={{ id: currentId || " " }}>
          {({ loading, error, data = {} }) => {
            console.log({ loading, error, data });
            const item = data.getFoodItem || {};
            const { id, title, category, description, href, icon } = item;

            return (
              <Section
                isLoading={loading}
                isError={error}
                isEmpty={!error && !(id && title)}
                isSuccess={!error && id && title}
              >
                <Card key={id} title={`${icon} ${upperFirst(title)}`}>
                  <div style={{ marginBottom: "15px" }}>
                    <Tag>{category}</Tag>
                  </div>
                  <p>{description}</p>
                  <p>
                    <Button type="primary" ghost href={href}>
                      See More
                    </Button>
                  </p>
                </Card>
              </Section>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default App;
