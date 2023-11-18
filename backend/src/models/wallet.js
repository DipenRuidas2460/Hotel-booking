const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Wallet",
    updatedAt: false,
  }
);

(async () => {
  await Wallet.sync({ force: false });
})();


module.exports = Wallet;