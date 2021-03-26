import logger from "../../config/logger.js";
import { matchPassword, generateToken } from "../../utils/utilsFuncs.js";

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
      getAllStaff: async (_, input, ctx) => {
        console.log("USER LOGGED", ctx.req.userId);
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
      authStaff: async (_, { input }, ctx) => {
        let { email, password } = input;

        let user = await models.staffs.findOne({
          where: { email: email },
        });

        if (!user) {
          throw new Error("User does not exists");
        }
        if (user && matchPassword(password, user.password)) {
          console.log("PASSWORD MATCH");
        } else {
          throw new Error("Invalid email or password");
        }
        ({ password, ...user } = user);

        console.log(JSON.stringify({ userId: email }));
        ctx.res.cookie("token", generateToken({ userId: email }), {
          httpOnly: true,
          maxAge: 60 * 60 * 15,
        });
        return { token: generateToken({ userId: email }) };
      },
      createStaff2: () => {
        return "Creando usuario2";
      },
    },
  };
};

export default staffResolverFunc;
