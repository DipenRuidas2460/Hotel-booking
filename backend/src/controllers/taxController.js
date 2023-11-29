const asyncHandler = require("express-async-handler");
const TaxList = require("../models/taxList");

const createTax = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const taxData = await TaxList.create(reqBody);
      const resp = await taxData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Tax data created Successfully!",
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

const fetchTaxById = asyncHandler(async (req, res) => {
  try {
    const response = await TaxList.findOne({
      where: { id: req.params.taxId },
    });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
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

const fetchAllTaxData = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      const response = await TaxList.findAll({});
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
      status: false,
      message: "Something went wrong",
      err: error.message,
    });
  }
});

const updateTaxList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const taxId = req.params.taxId;

    if (req.person.userTypeId === 1) {
      const updateTaxData = await TaxList.update(reqBody, {
        where: { id: taxId },
      });

      return res.status(201).json({
        status: updateTaxData[0] === 0 ? 404 : 200,
        data: updateTaxData,
        message:
          updateTaxData[0] === 0 ? "Nothing updated" : "Successfully Updated!",
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

const deleteTaxList = asyncHandler(async (req, res) => {
  try {
    const taxId = req.params.taxId;

    if (req.person.userTypeId === 1) {
      const deleteTax = await Invoice.destroy({
        where: { id: taxId },
      });

      if (!deleteTax) {
        return res
          .status(404)
          .send({ status: false, msg: "Tax List not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Tax Data deleted Successfully!",
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
  createTax,
  fetchTaxById,
  fetchAllTaxData,
  updateTaxList,
  deleteTaxList,
};
