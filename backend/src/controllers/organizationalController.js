const asyncHandler = require("express-async-handler");
const OrganizationalDetails = require("../models/organizationalDetails");

const createOrganizationalDetails = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.person.userTypeId === 1) {
      const organizationalData = await OrganizationalDetails.create(reqBody);
      const resp = await organizationalData.save();

      return res.status(201).json({
        status: true,
        response: resp,
        message: "Organizational Data created Successfully!",
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

const fetchOrganizationDetails = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      const response = await OrganizationalDetails.findAll({});
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

const updateOrganizationDetails = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.person.userTypeId === 1) {
      const response = await OrganizationalDetails.update(reqBody, {
        where: { id: req.params.organizationalId },
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

const deleteOrganizationalDetails = async function (req, res) {
  try {
    if (req.person.userTypeId === 1) {
      const deletedData = await OrganizationalDetails.destroy({
        where: { id: req.params.organizationalId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Organizational Data not found!" });
      }
      return res.status(200).json({
        status: true,
        message: "Organizational Data deleted Successfully!",
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
  createOrganizationalDetails,
  fetchOrganizationDetails,
  updateOrganizationDetails,
  deleteOrganizationalDetails,
};
