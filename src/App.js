import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import { Card, Input, Layout } from "antd";
import Section from "./Section";

const { Search } = Input;
const { Header } = Layout;

const GET_SINGLE_POST = gql`
  query GetSinglePost($id: ID!) {
    singlePost(id: $id) {
      id
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
        <Query query={GET_SINGLE_POST} variables={{ id: currentId || " " }}>
          {({ loading, error, data = {} }) => {
            console.log({ loading, error, data });
            const singlePost = data.singlePost || {};
            const { id, title, description } = singlePost;

            return (
              <Section
                isLoading={loading}
                isError={error}
                isEmpty={!error && !(id && title)}
                isSuccess={!error && id && title}
              >
                <Card key={id} title={title}>
                  <p>{description}</p>
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

// export default graphql(GET_SINGLE_POST, {
//   options: {
//     fetchPolicy: "cache-and-network"
//   },
//   props: ({ data }, props) =>
//     console.log("query", data) || {
//       ...props,
//       items: [data.singlePost],
//       isLoading: data.loading
//     }
// })(App);
