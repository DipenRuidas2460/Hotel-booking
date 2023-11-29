const asyncHandler = require("express-async-handler");
const FloorList = require("../models/floorList");

const createFloorList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const floorInfo = await FloorList.create(reqBody);
      const resp = await floorInfo.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Floor List created Successfully!",
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

const fetchAllFloorList = asyncHandler(async (req, res) => {
  try {
    const response = await FloorList.findAll({});
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

const updateFloorList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const floorId = req.params.floorId;

    if (req.person.userTypeId === 1) {
      const floorInfo = await FloorList.update(reqBody, {
        where: { id: floorId },
      });

      return res.status(201).json({
        status: floorInfo[0] === 0 ? 404 : 200,
        data: floorInfo,
        message:
          floorInfo[0] === 0 ? "Nothing updated" : "Successfully Updated!",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "This operation is not authorized!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: error,
    });
  }
});

const deleteFloorList = async function (req, res) {
  try {
    const floorId = req.params.floorId;

    if (req.person.userTypeId === 1) {
      const deletedData = await FloorList.destroy({
        where: { id: floorId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Floor Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Floor Data deleted Successfully!",
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
  createFloorList,
  fetchAllFloorList,
  updateFloorList,
  deleteFloorList,
};
