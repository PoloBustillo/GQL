import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

import _brands from "./production_schema/brands.js";
import _stores from "./sales_schema/stores.js";
import _staffs from "./sales_schema/staffs.js";
/*
var _categories = require("./categories");
var _customers = require("./customers");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _products = require("./products");

var _stocks = require("./stocks");

*/

const initModels = (sequelize) => {
  var brands = _brands(sequelize, DataTypes);
  var stores = _stores(sequelize, DataTypes);
  var staffs = _staffs(sequelize, DataTypes);
  /*
  var categories = _categories(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
 
  var stocks = _stocks(sequelize, DataTypes);


  products.belongsToMany(stores, {
    as: "stores",
    through: stocks,
    foreignKey: "product_id",
    otherKey: "store_id",
  });
  stores.belongsToMany(products, {
    as: "products",
    through: stocks,
    foreignKey: "store_id",
    otherKey: "product_id",
  });
  products.belongsTo(brands, { as: "brand", foreignKey: "brand_id" });
  brands.hasMany(products, { as: "products", foreignKey: "brand_id" });
  products.belongsTo(categories, { as: "category", foreignKey: "category_id" });
  categories.hasMany(products, { as: "products", foreignKey: "category_id" });
  stocks.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(stocks, { as: "stocks", foreignKey: "product_id" });
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(order_items, {
    as: "order_items",
    foreignKey: "product_id",
  });
  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id" });
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id" });
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id" });
  orders.belongsTo(staffs, { as: "staff", foreignKey: "staff_id" });
  staffs.hasMany(orders, { as: "orders", foreignKey: "staff_id" }); 
  stocks.belongsTo(stores, { as: "store", foreignKey: "store_id" });
  stores.hasMany(stocks, { as: "stocks", foreignKey: "store_id" });
  orders.belongsTo(stores, { as: "store", foreignKey: "store_id" });
  stores.hasMany(orders, { as: "orders", foreignKey: "store_id" });


*/
  staffs.hasMany(staffs, { as: "staffs", foreignKey: "manager_id" });
  staffs.belongsTo(staffs, { as: "manager", foreignKey: "manager_id" });
  stores.hasMany(staffs, { as: "staffs", foreignKey: "store_id" });
  staffs.belongsTo(stores, { as: "store", foreignKey: "store_id" });

  return {
    brands,
    staffs,
    stores,
    /*
    categories,
    customers,
    order_items,
    orders,
    products,
   
    stocks,
 
    */
  };
};

export default initModels;
