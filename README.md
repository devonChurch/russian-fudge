# Russian Fudge 🇷🇺 🐻 🍬 🍫

[![code style prettier](https://img.shields.io/badge/code_style-prettier-FF69A4.svg)](https://prettier.io/) [![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## What

**A proof of concept around a Full-stack implementation of a [GraphQL](https://graphql.org/) system.**

The architecture was an amalgamation of the following core components:

- [React Apollo](https://www.apollographql.com/docs/react/)
- [AWS AppSync](https://aws.amazon.com/appsync/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)

The UI was generated with a [React](https://reactjs.org/) based design system called [Ant](https://ant.design/docs/react/introduce).

## Infrastructure

A simple infrastructure hooking a **React SPA** to an **AppSync / DyanmoDB** data repository.

![russian-fudge](https://user-images.githubusercontent.com/15273233/45911650-506e0b00-be6a-11e8-83d0-8ffc5d01ab9a.png)

## Functionality

### Query

Users can _Free Text_ search against the titles of the "Food" cards.

![graphql-query](https://user-images.githubusercontent.com/15273233/45911409-fe77b600-be66-11e8-9266-bdb0f61ad9d3.gif)

### Mutation

Users can create their own "Food" card directly inside the application.

![graphql-mutation](https://user-images.githubusercontent.com/15273233/45911410-05062d80-be67-11e8-94c7-6f40ed2ddbdd.gif)

## Installation

- Clone this repository

  ```
  git clone https://github.com/devonChurch/russian-fudge.git && cd russian-fudge
  ```

- Install project dependencies

  ```
  nvm use && npm i
  ```

- Start a development server on [Port 3000](http://localhost:3000/)

  ```
  npm start
  ```

## GraphiQL

The AppSync [GraphiQL](https://github.com/graphql/graphiql) implementation offers a nice interface to test and iterate with while leveraging the built-in intellisense.

![graphiql](https://user-images.githubusercontent.com/15273233/45911791-ee160a00-be6b-11e8-86d5-9288f2bffe94.gif)
