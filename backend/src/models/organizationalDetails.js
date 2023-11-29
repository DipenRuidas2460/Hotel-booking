const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const OrganizationalDetails = sequelize.define(
  "OrganizationalDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "OrganizationalDetails",
  }
);

(async () => {
  await OrganizationalDetails.sync({ force: false });
})();

module.exports = OrganizationalDetails;
