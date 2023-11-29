const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const productData = await Product.create(reqBody);
      const resp = await productData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Product data created Successfully!",
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

const fetchAllProduct = asyncHandler(async (req, res) => {
  try {
    const response = await Product.findAll({});
    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
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

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const response = await Product.findOne({
      where: { id: req.params.productId },
    });
    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
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

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await Product.update(reqBody, {
        where: { id: req.params.productId },
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

const deleteProduct = async function (req, res) {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const deletedData = await Product.destroy({
        where: { id: req.params.productId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Product not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Product deleted Successfully!",
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
  createProduct,
  fetchAllProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
};
