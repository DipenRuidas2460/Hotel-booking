const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Wallet = require("./wallet");

const Payout = sequelize.define(
  "Payout",
  {
    carrierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false,
    },
  },
  {
    tableName: "Payout",
    updatedAt: false,
  }
);

(async () => {
  await Payout.sync({ force: false });
})();

Payout.belongsTo(Customer, { foreignKey: "carrierId", as: "payout-money" });
Payout.belongsTo(Wallet);

module.exports = Payout;
