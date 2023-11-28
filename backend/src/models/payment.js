const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    paymentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marchantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencySetting: {
      type: DataTypes.STRING,
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentSenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Payment",
  }
);

(async () => {
  await Payment.sync({ force: false });
})();

Payment.belongsTo(User, { foreignKey: "paymentSenderId" });

module.exports = Payment;