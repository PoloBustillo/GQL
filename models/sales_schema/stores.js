import Sequelize from "sequelize";
const storeFunc = (sequelize, DataTypes) => {
  return stores.init(sequelize, DataTypes);
};

class stores extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        store_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        store_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(25),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        street: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        zip_code: {
          type: DataTypes.STRING(5),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "stores",
        schema: "sales",
        timestamps: false,
        indexes: [
          {
            name: "PK__stores__A2F2A30C8DE6190A",
            unique: true,
            fields: [{ name: "store_id" }],
          },
        ],
      }
    );
    return stores;
  }
}

export default storeFunc;
