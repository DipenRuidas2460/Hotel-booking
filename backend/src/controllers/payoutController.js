const Payout = require("../models/payout");
const Customer = require("../models/customer");

const createPayoutData = async function (req, res) {
  try {
    const { amount, status } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const data = {
        carrierId: req.person.id,
        amount: amount,
        status: status,
      };

      const payoutData = await Payout.create(data);
      return res.status(201).json({
        status: true,
        message: "Payout Data created Successfully!",
        payoutData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchPayoutData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const payoutData = await Payout.findAll({
        where: {
          userId: req.person.id,
        },
        include: [
          {
            model: Customer,
            as: "payout-money",
            attributes: ["id", "fullName", "email", "role"],
          },
        ],
      });

      if (payoutData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        payoutData: payoutData,
      });
    } else if (userData.role === "admin") {
      const allPayoutData = await Payout.findAll({});

      if (allPayoutData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allPayoutData: allPayoutData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = { createPayoutData, fetchPayoutData };
