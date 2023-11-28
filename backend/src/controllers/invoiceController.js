const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoice");

const createInvoice = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const invoiceData = await Invoice.create(reqBody);
      const resp = await invoiceData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Invoice data created Successfully!",
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

const fetchInvoiceData = asyncHandler(async (req, res) => {
  try {
    const invoiceData = await Invoice.findOne({
      where: { userId: req.person.id },
    });

    return res.status(201).json({
      status: true,
      response: invoiceData,
      message: "Invoice data fetch successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: error.message,
    });
  }
});

const fetchAllInvoiceData = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      const allInvoiceData = await Invoice.findAll({});
      return res.status(201).json({
        status: true,
        response: allInvoiceData,
        message: "All Invoice data fetch successfully!",
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

const updateInvoice = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const invoiceId = req.params.invoiceId;

    if (req.person.userTypeId === 1) {
      const updateInvoice = await Invoice.update(reqBody, {
        where: { id: invoiceId },
      });

      return res.status(201).json({
        status: updateInvoice[0] === 0 ? 404 : 200,
        data: updateInvoice,
        message:
          updateInvoice[0] === 0 ? "Nothing updated" : "Successfully Updated!",
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

const deleteInvoice = asyncHandler(async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;

    if (req.person.userTypeId === 1) {
      const deleteInvoice = await Invoice.destroy({
        where: { id: invoiceId },
      });

      if (!deleteInvoice) {
        return res
          .status(404)
          .send({ status: false, msg: "Invoice not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Invoice Data deleted Successfully!",
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

module.exports = {
  createInvoice,
  fetchInvoiceData,
  fetchAllInvoiceData,
  updateInvoice,
  deleteInvoice,
};
