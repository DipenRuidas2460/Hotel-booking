const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const ItemType = sequelize.define(
  "ItemType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    itemTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "ItemType",
  }
);

(async () => {
  await ItemType.sync({ force: false });
})();

module.exports = ItemType;