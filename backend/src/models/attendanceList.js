const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const AttendanceList = sequelize.define(
  "AttendanceList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    presentPersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "AttendanceList",
  }
);

(async () => {
  await AttendanceList.sync({ force: false });
})();

AttendanceList.belongsTo(User, { foreignKey: "presentPersonId" });

module.exports = AttendanceList;