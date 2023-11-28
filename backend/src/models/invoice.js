const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");
const Booking = require("./booking");
const TaxList = require("./taxList");
const ItemDetails = require("./itemDetails");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invoiceNo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allTaxId: {
      type: DataTypes.INTEGER,
    },
    itemDetailsId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    bookingId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Invoice",
  }
);

(async () => {
  await Invoice.sync({ force: false });
})();

Invoice.belongsTo(TaxList, { foreignKey: "allTaxId" });
Invoice.belongsTo(ItemDetails, { foreignKey: "itemDetailsId" });
Invoice.belongsTo(User, { foreignKey: "userId" });
Invoice.belongsTo(Booking, { foreignKey: "bookingId" });

module.exports = Invoice;