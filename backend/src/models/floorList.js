const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const RoomList = require("./roomList");

const FloorList = sequelize.define(
  "FloorList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    floorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startRoomNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floorRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "FloorList",
  }
);

(async () => {
  await FloorList.sync({ force: false });
})();

FloorList.belongsTo(RoomList, { foreignKey: "floorRoomId" });

module.exports = FloorList;
