const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return order_items.init(sequelize, DataTypes);
}

class order_items extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    list_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'order_items',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "PK__order_it__837942D46022C468",
        unique: true,
        fields: [
          { name: "order_id" },
          { name: "item_id" },
        ]
      },
    ]
  });
  return order_items;
  }
}
