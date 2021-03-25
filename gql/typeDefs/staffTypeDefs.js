import { gql } from "apollo-server";

// Schema
export const typeDef = gql`
  type Staff {
    staff_id: ID!
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    active: Int!
    store_id: Store!
    manager_id: Staff
  }
  input inputStaff {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    active: Int!
    store_id: Int!
    manager_id: Int
  }

  type Query {
    #Staff
    getAllStaff: [Staff]
  }

  type Mutation {
    createStaff(input: inputStaff): Staff
    createStaff2: String
  }
`;
