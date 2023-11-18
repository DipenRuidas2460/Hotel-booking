const Customer = require("../models/customer");
const Transport = require("../models/transport");

const createTransportData = async function (req, res) {
  try {
    const { driverId, startLocation, endLocation, status, fare } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const data = {
        customerId: req.person.id,
        driverId,
        startLocation,
        endLocation,
        status,
        fare,
      };

      const transportData = await Transport.create(data);
      return res.status(201).json({
        status: true,
        message: "Transport Data created Successfully!",
        transportData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchTransportData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role !== "admin" && userData.id === req.person.id) {
      const transportData = await Transport.findAll({
        where: {
          [Op.or]: [{ customerId: req.person.id }, { driverId: req.person.id }],
        },
        include: [
          {
            model: Customer,
            attributes: [
              "id",
              "fullName",
              "email",
              "role",
            ],
          },
        ],
      });

      if (transportData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        transportData: transportData,
      });
    } else {
      const transportData = await Transport.findAll({});
      if (transportData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        transportData: transportData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = { createTransportData, fetchTransportData };
