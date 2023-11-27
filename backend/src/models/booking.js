const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const RoomList = require("./roomList");
const BookingSource = require("./bookingSource");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    bookingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingType: {
      type: DataTypes.STRING,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paidAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    dueAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    adults: {
      type: DataTypes.INTEGER,
    },
    children: {
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingNo: {
      type: DataTypes.STRING,
    },
    bookingRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingChannelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Booking",
  }
);

(async () => {
  await Booking.sync({ force: false });
})();

Booking.belongsTo(RoomList, { foreignKey: "bookingRoomId" });
Booking.belongsTo(BookingSource, { foreignKey: "bookingChannelId" });

module.exports = Booking;
