const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatSenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Chat",
    updatedAt: false,
  }
);

(async () => {
  await Chat.sync({ force: false });
})();

Chat.belongsTo(Customer, { foreignKey: "chatSenderId", as: "chatsender" });
Chat.belongsTo(Customer, { foreignKey: "personId", as: "receive" });

module.exports = Chat;