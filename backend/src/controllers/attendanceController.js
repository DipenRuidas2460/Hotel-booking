const asyncHandler = require("express-async-handler");
const AttendanceList = require("../models/attendanceList");

const createAttendanceList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const attendanceListInfo = await AttendanceList.create(reqBody);
      const resp = await attendanceListInfo.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Attendance List created Successfully!",
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

const fetchAllAttendanceList = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      const response = await AttendanceList.findAll({});
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

const fetchAttendanceById = asyncHandler(async (req, res) => {
  try {
    const response = await AttendanceList.findOne({
      where: { id: req.params.attendanceId },
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

const updateAttendanceList = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const attendanceId = req.params.attendanceId;

    if (req.person.userTypeId === 1) {
      const attandanceInfo = await AttendanceList.update(reqBody, {
        where: { id: attendanceId },
      });

      return res.status(201).json({
        status: attandanceInfo[0] === 0 ? 404 : 200,
        data: attandanceInfo,
        message:
          attandanceInfo[0] === 0 ? "Nothing updated" : "Successfully Updated!",
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

const deleteAttendanceList = async function (req, res) {
  try {
    const attendanceId = req.params.attendanceId;

    if (req.person.userTypeId === 1) {
      const deletedData = await AttendanceList.destroy({
        where: { id: attendanceId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Attandance List not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Attandance List deleted Successfully!",
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
  createAttendanceList,
  fetchAllAttendanceList,
  fetchAttendanceById,
  updateAttendanceList,
  deleteAttendanceList,
};
