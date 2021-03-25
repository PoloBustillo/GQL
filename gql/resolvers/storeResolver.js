import logger from "../../config/logger.js";

const storeResolverFunc = (models) => {
  // Resolvers
  return {
    Query: {
      getAllStores: async () => {
        try {
          const stores = models.stores.findAll({});
          return stores;
        } catch (error) {
          logger.error(error);
        }
      },
    },
  };
};

export default storeResolverFunc;
