import logger from "../../config/logger.js";

const staffResolverFunc = (models) => {
  // Resolvers
  return {
    Staff: {
      store_id: (parent) =>
        models.stores.findOne({ where: { store_id: parent.store_id } }),
      manager_id: (parent) =>
        models.staffs.findOne({ where: { staff_id: parent.manager_id } }),
    },
    Query: {
      getAllStaff: async () => {
        try {
          const staff = models.staffs.findAll({});
          return staff;
        } catch (error) {
          logger.error(error);
        }
      },
    },
    Mutation: {
      createStaff: async (_, { input }) => {
        try {
          const staff = await models.staffs.create(input);
          return staff;
        } catch (error) {
          logger.error(error);
        }
        return staff;
      },
      createStaff2: () => {
        return "Creando usuario2";
      },
    },
  };
};

export default staffResolverFunc;
