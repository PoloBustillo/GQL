import { gql } from "apollo-server";

// Schema
export const typeDef = gql`
  type Store {
    store_id: ID!
    store_name: String!
    phone: String
    email: String
    street: String
    city: String
    state: String
    zip_code: String
  }
  extend type Query {
    #Staff
    getAllStores: [Store]
  }
`;
