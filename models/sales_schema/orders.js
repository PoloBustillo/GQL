const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return orders.init(sequelize, DataTypes);
}

class orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    order_status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    required_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    shipped_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stores',
        key: 'store_id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staffs',
        key: 'staff_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "PK__orders__4659622951BAA832",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  return orders;
  }
}
