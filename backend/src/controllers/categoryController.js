const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const categoryData = await Category.create(reqBody);
      const resp = await categoryData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Category data created Successfully!",
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

const fetchAllCategoryList = asyncHandler(async (req, res) => {
  try {
    const categoryList = await Category.findAll({});
    return res.status(200).json({
      status: true,
      response: categoryList,
      message: "Category List fetched Successfully!",
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

const updateCategoryList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const categoryId = req.params.categoryId;

    if (req.person.userTypeId === 1) {
      const updatedCategory = await Category.update(reqBody, {
        where: { id: categoryId },
      });

      return res.status(201).json({
        status: updatedCategory[0] === 0 ? 404 : 200,
        data: updatedCategory,
        message:
          updatedCategory[0] === 0
            ? "Nothing updated"
            : "Successfully Updated!",
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

const deleteCategoryList = async function (req, res) {
  try {
    const categoryId = req.params.categoryId;

    if (req.person.userTypeId === 1) {
      const deletedData = await Category.destroy({
        where: { id: categoryId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Category Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Category Data deleted Successfully!",
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
  createCategory,
  fetchAllCategoryList,
  updateCategoryList,
  deleteCategoryList,
};
