import Sequelize from "sequelize";

const brandsFunc = (sequelize, DataTypes) => {
  return brands.init(sequelize, DataTypes);
};

class brands extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        brand_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        brand_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "brands",
        schema: "production",
        timestamps: false,
        indexes: [
          {
            name: "PK__brands__5E5A8E27A350F95D",
            unique: true,
            fields: [{ name: "brand_id" }],
          },
        ],
      }
    );
    return brands;
  }
}

export default brandsFunc;
