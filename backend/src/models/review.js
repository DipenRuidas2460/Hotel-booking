const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Transport = require("./transport");

const Review = sequelize.define(
  "Review",
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
    transportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Review",
    updatedAt: false,
  }
);

(async () => {
  await Review.sync({ force: false });
})();

Review.belongsTo(Customer, { foreignKey: "customerId", as: "customerReview" });
Review.belongsTo(Customer, { foreignKey: "driverId" });
Review.belongsTo(Transport, { foreignKey: "transportId", as: "trans" });

module.exports = Review;
