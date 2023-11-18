const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Truck = sequelize.define(
  "Truck",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    carrierId: {
      type: DataTypes.INTEGER,
    },
    truckNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    locationAvailability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Truck",
    updatedAt: false,
  }
);

(async () => {
  await Truck.sync({ force: false });
})();

Truck.belongsTo(Customer, { foreignKey: "carrierId", as: "truckDetails" });

module.exports = Truck;