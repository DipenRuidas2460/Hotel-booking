const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentCategory: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    offer: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "Category",
  }
);

(async () => {
  await Category.sync({ force: false });
})();

module.exports = Category;