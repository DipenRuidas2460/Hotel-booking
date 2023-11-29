const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");
const BookingSource = require("../models/bookingSource");

const createBooking = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const bookingData = await Booking.create(reqBody);
      const resp = await bookingData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Booking created Successfully!",
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

const createBookingChannel = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const bookingChannelData = await BookingSource.create(reqBody);
      const resp = await bookingChannelData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Booking Channel created Successfully!",
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

const fetchBookingList = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await Booking.findAll({});
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

const fetchBookingById = asyncHandler(async (req, res) => {
  try {
    const response = await Booking.findOne({
      where: { id: req.params.bookingId },
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

const fetchBookingChannelList = asyncHandler(async (req, res) => {
  try {
    const response = await BookingSource.findAll({});
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

const updateBooking = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await Booking.update(reqBody, {
        where: { id: req.params.bookingId },
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

const updateBookingChannel = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const response = await BookingSource.update(reqBody, {
        where: { id: req.params.bookingChannelId },
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

const deleteBooking = async function (req, res) {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const deletedData = await Booking.destroy({
        where: { id: req.params.bookingId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Booking not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Booking deleted Successfully!",
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

const deleteBookingChannel = async function (req, res) {
  try {
    if (req.person.userTypeId === 1 && req.person.userTypeId === 2) {
      const deletedData = await BookingSource.destroy({
        where: { id: req.params.bookingChannelId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Booking Channel not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Booking Channel deleted Successfully!",
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
  createBooking,
  createBookingChannel,
  fetchBookingList,
  fetchBookingChannelList,
  fetchBookingById,
  updateBooking,
  updateBookingChannel,
  deleteBooking,
  deleteBookingChannel,
};
