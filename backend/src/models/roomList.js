const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const RoomList = sequelize.define(
  "RoomList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomNo: {
      type: DataTypes.INTEGER,
    },
    facilityName: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bedCharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    personCharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    extraCapability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reserveCondition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adults: {
      type: DataTypes.INTEGER,
    },
    children: {
      type: DataTypes.INTEGER,
    },
    addFacilityType: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    assigneTo: {
      type: DataTypes.STRING,
    },
    checkList: {
      type: DataTypes.STRING,
    },
    dateStart: {
      type: DataTypes.DATEONLY,
    },
    dateEnd: {
      type: DataTypes.DATEONLY,
    },
    houseKeeper: {
      type: DataTypes.STRING,
    },
    bedName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "RoomList",
  }
);

(async () => {
  await RoomList.sync({ force: false });
})();

module.exports = RoomList;