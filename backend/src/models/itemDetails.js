const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Category = require("./category");
const ItemType = require("./itemType");

const ItemDetails = sequelize.define(
  "ItemDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poolName: {
      type: DataTypes.STRING,
    },
    taskName: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    menuType: {
      type: DataTypes.JSON,
    },
    fromTime: {
      type: DataTypes.DATE,
    },
    toTime: {
      type: DataTypes.DATE,
    },
    itemCost: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    paymentStatus: {
      type: DataTypes.STRING,
    },
    invoiceNo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    ready: {
      type: DataTypes.INTEGER,
    },
    operateBy: {
      type: DataTypes.STRING,
    },
    inUse: {
      type: DataTypes.INTEGER,
    },
    inLaundry: {
      type: DataTypes.BOOLEAN,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ItemDetails",
  }
);

(async () => {
  await ItemDetails.sync({ force: false });
})();

ItemDetails.belongsTo(ItemType, { foreignKey: "itemTypeId" });
ItemDetails.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = ItemDetails;