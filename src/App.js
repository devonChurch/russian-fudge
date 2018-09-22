import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Layout } from "antd";
import Section from "./Section";
import Food from "./Food";
import Modal from "./Modal";
import Header from "./Header";

const GET_SINGLE_FOOD = gql`
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

// NOTE: The "limit" value is not a representation of how many values are returned
// it influences how many items in the database are queried. In that regard there
// can be situations where values that should be returned are not as the fall
// outside the bounds of the "limit".
const GET_ALL_VEGETABLES = gql`
  query listFoodItems($title: String!) {
    listFoodItems(filter: { title: { contains: $title } }) {
      items {
        id
        category
        description
        href
        icon
        title
      }
    }
  }
`;

const CREATE_FOOD = gql`
  mutation createFoodItem(
    $title: String!
    $category: String!
    $description: String!
    $href: String!
    $icon: String!
  ) {
    createFoodItem(
      input: {
        title: $title
        category: $category
        description: $description
        href: $href
        icon: $icon
      }
    ) {
      id
      title
      category
      description
      href
      icon
    }
  }
`;

const resetModalFormState = () => ({
  isModalOpen: false
});

const resetSearchBarState = () => ({
  searchValue: ""
});

class App extends Component {
  state = {
    ...resetSearchBarState(),
    ...resetModalFormState()
  };

  handleModalOpen = () => {
    this.setState(() => ({
      ...resetModalFormState(),
      isModalOpen: true
    }));
  };

  handleModalClose = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  handleSearchInput = value => {
    this.setState(() => ({ searchValue: value }));
  };

  render() {
    const { handleSearchInput, handleModalOpen, handleModalClose } = this;
    const { searchValue, isModalOpen } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           _                   _           
          | |_   ___  __ _  __| | ___  _ _ 
          | ' \ / -_)/ _` |/ _` |/ -_)| '_|
          |_||_|\___|\__,_|\__,_|\___||_|    
                                                                              */}
        <Header {...{ handleSearchInput, handleModalOpen }} />

        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                         _              _   
           __  ___  _ _ | |_  ___  _ _ | |_ 
          / _|/ _ \| ' \|  _|/ -_)| ' \|  _|
          \__|\___/|_||_|\__|\___||_||_|\__|  

          The query need "some" kind of content e.g a single space otherwise
          the GraphQL will error out and not recover (as am ID is required).
                                                                              */}
        <Query
          query={GET_ALL_VEGETABLES}
          variables={{ title: searchValue || " " }}
        >
          {({ loading, error, data = {} }) => {
            const items =
              (data.listFoodItems && data.listFoodItems.items) || [];
            const hasItems = Boolean(items.length);

            return (
              <Section
                isLoading={loading}
                isError={error}
                isEmpty={!error && !hasItems}
                isSuccess={!error && hasItems}
              >
                {items.map(({ id, ...item }) => (
                  <Food {...item} key={id} />
                ))}
              </Section>
            );
          }}
        </Query>

        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                          _        _ 
           _ __   ___  __| | __ _ | |
          | '  \ / _ \/ _` |/ _` || |
          |_|_|_|\___/\__,_|\__,_||_|  
                                                                              */}
        <Mutation mutation={CREATE_FOOD}>
          {(handleCreateFood, mutationParams) => (
            <Modal
              {...{
                isModalOpen,
                handleCreateFood,
                handleModalClose
              }}
            />
          )}
        </Mutation>
      </Layout>
    );
  }
}

export default App;
