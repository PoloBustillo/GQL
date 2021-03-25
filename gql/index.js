import _ from "lodash";
import { makeExecutableSchema } from "apollo-server";
const { merge } = _;
import initModels from "../models/init-models.js";
import sequelize from "../config/dbConnection.js";
import staffResolverFunc from "./resolvers/staffResolver.js";
import storeResolverFunc from "./resolvers/storeResolver.js";
import { typeDef as staffTypeDefs } from "./typeDefs/staffTypeDefs.js";
import { typeDef as storeTypeDefs } from "./typeDefs/storeTypeDefs.js";

const staffResolver = staffResolverFunc(initModels(sequelize));
const storeResolver = storeResolverFunc(initModels(sequelize));

export default makeExecutableSchema({
  typeDefs: [storeTypeDefs, staffTypeDefs],
  resolvers: merge(staffResolver, storeResolver),
});
