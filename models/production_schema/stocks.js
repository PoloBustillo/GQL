import Sequelize from "sequelize";

export const stocksFunc = (sequelize, DataTypes) => {
  return stocks.init(sequelize, DataTypes);
};

class stocks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "stores",
            key: "store_id",
          },
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "products",
            key: "product_id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "stocks",
        schema: "production",
        timestamps: false,
        indexes: [
          {
            name: "PK__stocks__E68284D3A48E9ED2",
            unique: true,
            fields: [{ name: "store_id" }, { name: "product_id" }],
          },
        ],
      }
    );
    return stocks;
  }
}
