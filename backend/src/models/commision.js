const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Commission = sequelize.define(
  "Commission",
  {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Commission",
    updatedAt: false,
  }
);

(async () => {
  await Commission.sync({ force: false });
})();

Commission.belongsTo(Customer, { foreignKey: "adminId", as: "commisionCut" });

module.exports = Commission;
