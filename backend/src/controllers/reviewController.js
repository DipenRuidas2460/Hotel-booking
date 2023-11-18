const Customer = require("../models/customer");
const Review = require("../models/review");
const { Op } = require("sequelize");

const createReviewData = async function (req, res) {
  try {
    const { driverId, transportId, rating, comment } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const data = {
        customerId: req.person.id,
        driverId,
        transportId,
        rating,
        comment,
      };

      const reviewData = await Review.create(data);
      return res.status(201).json({
        status: true,
        message: "Review Data created Successfully!",
        reviewData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchReviewData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id",  "role"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const reviewData = await Review.findAll({
        where: {
          customerId: req.person.id,
        },
        include: [
          {
            model: Customer,
            as: "customerReview",
            attributes: [
              "id",
              "fullName",
              "email",
              "role",
            ],
          },
        ],
      });

      if (reviewData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        reviewData: reviewData,
      });
    } else if (userData.role === "admin") {
      const allReviewData = await Review.findAll({});

      if (allReviewData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allReviewData: allReviewData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createReviewData,
  fetchReviewData,
};
