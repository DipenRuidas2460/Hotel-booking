const Commission = require("../models/commision");
const Customer = require("../models/customer");

const createCommisionData = async function (req, res) {
  try {
    const { rate } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "admin" && userData.id === req.person.id) {
      const data = {
        adminId: req.person.id,
        rate: rate,
      };

      const commisionData = await Commission.create(data);
      return res.status(201).json({
        status: true,
        message: "Commision Data created Successfully!",
        commisionData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchCommisionData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "admin" && userData.id === req.person.id) {
      const commisionData = await Commission.findOne({
        where: {
          adminId: req.person.id,
        },
        include: [
          {
            model: Customer,
            as: "commisionCut",
            attributes: ["id", "role"],
          },
        ],
      });

      if (commisionData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        commisionData: commisionData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

Commission.belongsTo(Customer);

module.exports = { createCommisionData, fetchCommisionData };
