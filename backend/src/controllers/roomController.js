const asyncHandler = require("express-async-handler");
const RoomList = require("../models/roomList");
const User = require("../models/user");
const UserType = require("../models/userType");

const createRoomList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    const userTypeData = await User.findOne({
      where: { id: req.person.id },
      include: [
        {
          model: UserType,
          attributes: ["id", "userRole"],
        },
      ],
    });

    if (userTypeData.UserType.userRole === "admin") {
      const roomInfo = await RoomList.create(reqBody);
      const resp = await roomInfo.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Room List created Successfully!",
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

const fetchAllRoomList = asyncHandler(async (req, res) => {
  try {
    const roomList = await RoomList.findAll({});
    return res.status(200).json({
      status: true,
      response: roomList,
      message: "Room List fetched Successfully!",
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

const updateRoomList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const roomId = req.params.roomId;

    const userTypeData = await User.findOne({
      where: { id: req.person.id },
      include: [
        {
          model: UserType,
          attributes: ["id", "userRole"],
        },
      ],
    });

    if (userTypeData.UserType.userRole === "admin") {
      const roomInfo = await RoomList.update({
        reqBody,
        where: { id: roomId },
      });

      return res.status(201).json({
        status: roomInfo[0] === 0 ? 404 : 200,
        data: roomInfo,
        message:
          roomInfo[0] === 0 ? "Nothing updated" : "Successfully Updated!",
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

const deleteRoomList = async function (req, res) {
  try {
    const roomId = req.params.roomId;

    const userTypeData = await User.findOne({
      where: { id: req.person.id },
      include: [
        {
          model: UserType,
          attributes: ["id", "userRole"],
        },
      ],
    });

    if (userTypeData.UserType.userRole === "admin") {
      const deletedData = await RoomList.destroy({
        where: { id: roomId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Room Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Room Data deleted Successfully!",
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
  createRoomList,
  fetchAllRoomList,
  updateRoomList,
  deleteRoomList,
};