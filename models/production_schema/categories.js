const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return categories.init(sequelize, DataTypes);
}

class categories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categories',
    schema: 'production',
    timestamps: false,
    indexes: [
      {
        name: "PK__categori__D54EE9B4006CDC92",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  return categories;
  }
}
