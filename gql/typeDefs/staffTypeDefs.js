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
    password: String
  }
  type Token {
    token: String!
  }
  input inputStaff {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    active: Int!
    store_id: Int!
    manager_id: Int
    password: String
  }
  input inputCreedentials {
    email: String!
    password: String!
  }

  type Query {
    #Staff
    getAllStaff: [Staff]
    getStaffById(input: Int): Staff
  }

  type Mutation {
    createStaff(input: inputStaff): Staff
    authStaff(input: inputCreedentials): Token
    createStaff2: String
  }
`;
