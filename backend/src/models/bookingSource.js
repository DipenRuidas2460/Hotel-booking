const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const BookingSource = sequelize.define(
  "BookingSource",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bookingChannelName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "BookingSource",
  }
);

(async () => {
  await BookingSource.sync({ force: false });
})();

module.exports = BookingSource;