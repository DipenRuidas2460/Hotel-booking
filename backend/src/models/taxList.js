const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const TaxList = sequelize.define(
  "TaxList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    taxName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxRate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "TaxList",
  }
);

(async () => {
  await TaxList.sync({ force: false });
})();

module.exports = TaxList;