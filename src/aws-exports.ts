import type { ResourcesConfig } from "aws-amplify";

const awsconfig: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint:
        "https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql",
      region: "ap-southeast-2",
      defaultAuthMode: "apiKey",
      apiKey: "<API_KEY>",
    },
  },
};

export default awsconfig;
