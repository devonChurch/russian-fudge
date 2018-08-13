import React from "react";
import ReactDOM from "react-dom";
import AWSAppSyncClient from "aws-appsync";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react"; // this needs to also be installed when working with React
import App from "./App";
import "antd/dist/antd.css";

const client = new AWSAppSyncClient({
  url:
    "https://wmbba72ntbgfdgzavbt2al4u2e.appsync-api.us-east-1.amazonaws.com/graphql",
  region: "us-east-1",
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: "da2-ln5vcdp2oje75ptstwgrdxv7a4",
    disableOffline: true
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById("root")
);
