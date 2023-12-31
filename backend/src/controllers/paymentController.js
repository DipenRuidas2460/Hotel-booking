const asyncHandler = require("express-async-handler");
const Payment = require("../models/payment");

const createPayment = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const paymentData = await Payment.create(reqBody);
      const resp = await paymentData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Payment data created Successfully!",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "This operation is not authorized!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: error.message,
    });
  }
});

const fetchAllPayment = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await Payment.findAll({});
      return res.status(200).json({
        status: "success",
        data: response,
        message: response.length ? "Successfully fetch data" : "No data found",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "This operation is not authorized!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      messageInfo: error,
    });
  }
});

const fetchPaymentById = asyncHandler(async (req, res) => {
  try {
    const response = await Payment.findOne({
      where: { id: req.params.paymentId },
    });
    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length
        ? "Successfully fetch data"
        : "Data not present!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      messageInfo: error,
    });
  }
});

const updatePayment = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await Payment.update(reqBody, {
        where: { id: req.params.paymentId },
      });

      return res.status(201).json({
        status: response[0] === 0 ? 404 : 200,
        data: response,
        message:
          response[0] === 0 ? "Nothing updated" : "Successfully Updated!",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "This operation is not authorized!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      messageInfo: error,
    });
  }
});

const deletePayment = async function (req, res) {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const deletedData = await Payment.destroy({
        where: { id: req.params.paymentId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Payment Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Payment Data deleted Successfully!",
      });
    } else {
      return res.status(400).json({
        status: false,
        msg: "Not Authorized to delete Data!",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createPayment,
  fetchAllPayment,
  fetchPaymentById,
  updatePayment,
  deletePayment,
};
