const express = require("express");
const router = express.Router();
const { validateTokenMiddleware } = require("../middleware/auth");
require("dotenv").config();

const {
  login,
  addUser,
  forgetPass,
  fpUpdatePass,
  logOut,
  updateUser,
  getUserById,
  updatePassword,
  getAllUsers,
  createUserDetails,
  createUserType,
  updateUserDetails
} = require("../controllers/userController");
const { createRoomList, fetchAllRoomList, updateRoomList, deleteRoomList } = require("../controllers/roomController");

// --------------------------------------- User Profile Route ----------------------------------------------------------------------------------

router.post("/user/register", addUser);
router.post("/user/userType", createUserType);
router.post("/user/login", login);
router.get("/user/logout", logOut);
router.post("/user/forgotpass", forgetPass);
router.post("/user/resetpass", fpUpdatePass);
router.post("/user/userDetails", validateTokenMiddleware, createUserDetails);
router.put("/user/update", validateTokenMiddleware, updateUser);
router.put("/user/updateUserDetails", validateTokenMiddleware, updateUserDetails);
router.patch("/user/updatePassword", validateTokenMiddleware, updatePassword);
router.get("/user/getUserById", validateTokenMiddleware, getUserById);
router.get("/user/getAllUsers", validateTokenMiddleware, getAllUsers);

// ---------------------------------------- Room Route ------------------------------------------------------------------------------------------

router.post("/room/createList", validateTokenMiddleware, createRoomList);
router.get("/room/fetchAllRoom", validateTokenMiddleware, fetchAllRoomList);
router.put("/room/updateRoomList", validateTokenMiddleware, updateRoomList);
router.delete("/room/deleteRoomList", validateTokenMiddleware, deleteRoomList);

module.exports = router;