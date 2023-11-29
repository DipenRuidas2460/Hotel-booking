const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Category = require("./category");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.INTEGER,
    },
    used: {
      type: DataTypes.INTEGER,
    },
    destroyed: {
      type: DataTypes.BOOLEAN,
    },
    isLaundryItem: {
      type: DataTypes.BOOLEAN,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Product",
  }
);

(async () => {
  await Product.sync({ force: false });
})();

Product.belongsTo(Category, { foreignKey: "productCategoryId" });

module.exports = Product;