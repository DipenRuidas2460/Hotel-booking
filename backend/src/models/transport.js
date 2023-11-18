const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Transport = sequelize.define(
  "Transport",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Transport",
    updatedAt: false,
  }
);

(async () => {
  await Transport.sync({ force: false });
})();

Transport.belongsTo(Customer, { foreignKey: "customerId"});
Transport.belongsTo(Customer, { foreignKey: "driverId"});

module.exports = Transport;