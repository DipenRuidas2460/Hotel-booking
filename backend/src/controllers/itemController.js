const asyncHandler = require("express-async-handler");
const ItemDetails = require("../models/itemDetails");
const ItemType = require("../models/itemType");

const createItemType = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const itemTypeList = await ItemType.create(reqBody);
      const resp = await itemTypeList.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Item Details list created Successfully!",
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

const createItemDetails = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const itemDetailsList = await ItemDetails.create(reqBody);
      const resp = await itemDetailsList.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Item Details list created Successfully!",
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

const fetchAllItemTypeList = asyncHandler(async (req, res) => {
  try {
    const response = await ItemType.findAll({});
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

const updateItemType = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1) {
      const response = await ItemType.update(reqBody, {
        where: { id: req.params.itemTypeId },
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

const deleteItemType = async function (req, res) {
  try {
    if (req.person.userTypeId === 1) {
      const deletedData = await ItemType.destroy({
        where: { id: req.params.itemTypeId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "ItemType Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "ItemType Data deleted Successfully!",
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
  createItemDetails,
  createItemType,
  fetchAllItemTypeList,
  updateItemType,
  deleteItemType,
};
