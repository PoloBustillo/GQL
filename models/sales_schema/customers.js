const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return customers.init(sequelize, DataTypes);
}

class customers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customers',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "PK__customer__CD65CB85C02A3903",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
  return customers;
  }
}
