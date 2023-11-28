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
  updateUserDetails,
  getUserDetails,
} = require("../controllers/userController");
const {
  createRoomList,
  fetchAllRoomList,
  updateRoomList,
  deleteRoomList,
} = require("../controllers/roomController");
const {
  createTax,
  fetchTaxData,
  fetchAllTaxData,
  updateTaxList,
  deleteTaxList,
} = require("../controllers/taxController");
const {
  createCategory,
  fetchAllCategoryList,
  updateCategoryList,
  deleteCategoryList,
} = require("../controllers/categoryController");
const {
  createItemType,
  createItemDetails,
} = require("../controllers/itemController");

// --------------------------------------- User Profile Route ----------------------------------------------------------------------------------

router.post("/user/register", addUser);
router.post("/user/userType", createUserType);
router.post("/user/login", login);
router.get("/user/logout", logOut);
router.post("/user/forgotpass", forgetPass);
router.post("/user/resetpass", fpUpdatePass);
router.post("/user/userDetails", validateTokenMiddleware, createUserDetails);
router.put("/user/update", validateTokenMiddleware, updateUser);
router.put(
  "/user/updateUserDetails",
  validateTokenMiddleware,
  updateUserDetails
);
router.patch("/user/updatePassword", validateTokenMiddleware, updatePassword);
router.get("/user/getUserById", validateTokenMiddleware, getUserById);
router.get("/user/getAllUsers", validateTokenMiddleware, getAllUsers);
router.get("/user/getUserDetails", validateTokenMiddleware, getUserDetails);

// ---------------------------------------- Room Route ------------------------------------------------------------------------------------------

router.post("/room/createList", validateTokenMiddleware, createRoomList);
router.get("/room/fetchAllRoom", validateTokenMiddleware, fetchAllRoomList);
router.put(
  "/room/updateRoomList/:roomId",
  validateTokenMiddleware,
  updateRoomList
);
router.delete(
  "/room/deleteRoomList/:roomId",
  validateTokenMiddleware,
  deleteRoomList
);

// ---------------------------------------- Item Route ------------------------------------------------------------------------------------------

router.post("/item/createItemType", validateTokenMiddleware, createItemType);
router.post(
  "/item/createItemDetails",
  validateTokenMiddleware,
  createItemDetails
);
// router.put("/room/updateRoomList", validateTokenMiddleware, updateRoomList);
// router.delete("/room/deleteRoomList", validateTokenMiddleware, deleteRoomList);

// ---------------------------------------- Category Route ------------------------------------------------------------------------------------------

router.post(
  "/category/createCategory",
  validateTokenMiddleware,
  createCategory
);
router.get(
  "/category/fetchAllCategory",
  validateTokenMiddleware,
  fetchAllCategoryList
);
router.put(
  "/category/updateCategory/:categoryId",
  validateTokenMiddleware,
  updateCategoryList
);
router.delete(
  "/category/deleteCategory/:categoryId",
  validateTokenMiddleware,
  deleteCategoryList
);

// ---------------------------------------- Tax Routes ------------------------------------------------------------------------------------------

router.post("/tax/createTax", validateTokenMiddleware, createTax);
router.get("/tax/fetchTaxById", validateTokenMiddleware, fetchTaxData);
router.get("/tax/fetchAllTax", validateTokenMiddleware, fetchAllTaxData);
router.put("/tax/updateTaxList/:taxId", validateTokenMiddleware, updateTaxList);
router.delete(
  "/tax/deleteTaxList/:taxId",
  validateTokenMiddleware,
  deleteTaxList
);

module.exports = router;
