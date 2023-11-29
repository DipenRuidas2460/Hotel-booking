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
  fetchTaxById,
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
  fetchAllItemTypeList,
  fetchAllItemDetailsList,
  updateItemType,
  updateItemDetails,
  deleteItemType,
  deleteItemDetails,
} = require("../controllers/itemController");

const {
  createBooking,
  createBookingChannel,
  fetchBookingList,
  fetchBookingChannelList,
  fetchBookingById,
  updateBooking,
  updateBookingChannel,
  deleteBooking,
  deleteBookingChannel,
} = require("../controllers/bookingController");

const {
  createPayment,
  fetchAllPayment,
  fetchPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const {
  createOrganizationalDetails,
  fetchOrganizationDetails,
  updateOrganizationDetails,
  deleteOrganizationalDetails,
} = require("../controllers/organizationalController");

const {
  createProduct,
  fetchAllProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createFloorList,
  fetchAllFloorList,
  updateFloorList,
  deleteFloorList,
} = require("../controllers/floorController");

const {
  createAttendanceList,
  fetchAllAttendanceList,
  fetchAttendanceById,
  updateAttendanceList,
  deleteAttendanceList,
} = require("../controllers/attendanceController");

const {
  createInvoice,
  fetchInvoiceData,
  fetchAllInvoiceData,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");

// --------------------------------------- User Route ----------------------------------------------------------------------------------

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

router.post("/room/createRoomList", validateTokenMiddleware, createRoomList);
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

// ---------------------------------------- Floor Route ------------------------------------------------------------------------------------------

router.post("/floor/createFloorList", validateTokenMiddleware, createFloorList);
router.get("/floor/fetchAllFloor", validateTokenMiddleware, fetchAllFloorList);
router.put(
  "/floor/updateFloorList/:floorId",
  validateTokenMiddleware,
  updateFloorList
);
router.delete(
  "/floor/deleteFloorList/:floorId",
  validateTokenMiddleware,
  deleteFloorList
);

// ---------------------------------------- Item Route ------------------------------------------------------------------------------------------

router.post(
  "/itemType/createItemType",
  validateTokenMiddleware,
  createItemType
);
router.post(
  "/item/createItemDetails",
  validateTokenMiddleware,
  createItemDetails
);
router.get(
  "/itemType/fetchItemType",
  validateTokenMiddleware,
  fetchAllItemTypeList
);
router.get(
  "/item/fetchItemDetails",
  validateTokenMiddleware,
  fetchAllItemDetailsList
);
router.put(
  "/itemType/updateItemType/:itemTypeId",
  validateTokenMiddleware,
  updateItemType
);
router.put(
  "/item/updateItemDetails/:itemDetailsId",
  validateTokenMiddleware,
  updateItemDetails
);
router.delete(
  "/itemType/deleteItemType/:itemTypeId",
  validateTokenMiddleware,
  deleteItemType
);
router.delete(
  "/item/deleteItemDetails/:itemDetailsId",
  validateTokenMiddleware,
  deleteItemDetails
);

// ---------------------------------------- Booking Route -------------------------------------------------------------------------------------------

router.post("/booking/createBooking", validateTokenMiddleware, createBooking);
router.post(
  "/bookingChannel/createBookingChannel",
  validateTokenMiddleware,
  createBookingChannel
);
router.get(
  "/booking/fetchAllBooking",
  validateTokenMiddleware,
  fetchBookingList
);
router.get(
  "/bookingChannel/fetchBookingChannel",
  validateTokenMiddleware,
  fetchBookingChannelList
);
router.get(
  "/booking/fetchById/:bookingId",
  validateTokenMiddleware,
  fetchBookingById
);
router.put(
  "/booking/updateBooking/:bookingId",
  validateTokenMiddleware,
  updateBooking
);
router.put(
  "/bookingChannel/update/:bookingChannelId",
  validateTokenMiddleware,
  updateBookingChannel
);
router.delete(
  "/booking/deleteBooking/:bookingId",
  validateTokenMiddleware,
  deleteBooking
);
router.delete(
  "/bookingChannel/delete/:bookingId",
  validateTokenMiddleware,
  deleteBookingChannel
);

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
router.get("/tax/fetchTaxById/:taxId", validateTokenMiddleware, fetchTaxById);
router.get("/tax/fetchAllTax", validateTokenMiddleware, fetchAllTaxData);
router.put("/tax/updateTaxList/:taxId", validateTokenMiddleware, updateTaxList);
router.delete(
  "/tax/deleteTaxList/:taxId",
  validateTokenMiddleware,
  deleteTaxList
);

// ---------------------------------------- Payment Route ---------------------------------------------------------------------------------------

router.post("/payment/createPayment", validateTokenMiddleware, createPayment);
router.get(
  "/payment/fetchAllPayment",
  validateTokenMiddleware,
  fetchAllPayment
);
router.get(
  "/payment/fetchPaymentById/:paymentId",
  validateTokenMiddleware,
  fetchPaymentById
);
router.put(
  "/payment/updatePayment/:paymentId",
  validateTokenMiddleware,
  updatePayment
);
router.delete(
  "/payment/deletePayment/:paymentId",
  validateTokenMiddleware,
  deletePayment
);

// --------------------------------------- Organizational Route ---------------------------------------------------------------------------------

router.post(
  "/organizational/createOrganizationalData",
  validateTokenMiddleware,
  createOrganizationalDetails
);
router.get(
  "/organizational/fetchOrganizationalData",
  validateTokenMiddleware,
  fetchOrganizationDetails
);
router.put(
  "/organizational/updateOrganizationalData/:organizationalId",
  validateTokenMiddleware,
  updateOrganizationDetails
);
router.delete(
  "/organizational/deleteOrganizationalData/:organizationalId",
  validateTokenMiddleware,
  deleteOrganizationalDetails
);

// --------------------------------------- Product Route ----------------------------------------------------------------------------------------

router.post("/product/createProduct", validateTokenMiddleware, createProduct);
router.get(
  "/payment/fetchAllProduct",
  validateTokenMiddleware,
  fetchAllProduct
);
router.get(
  "/product/fetchProductById/:productId",
  validateTokenMiddleware,
  fetchProductById
);
router.put(
  "/product/updateProduct/:productId",
  validateTokenMiddleware,
  updateProduct
);
router.delete(
  "/product/deleteProduct/:productId",
  validateTokenMiddleware,
  deleteProduct
);

// --------------------------------------- Attendance Route -------------------------------------------------------------------------------------

router.post(
  "/attendance/createAttendance",
  validateTokenMiddleware,
  createAttendanceList
);
router.get(
  "/attendance/fetchAllAttendance",
  validateTokenMiddleware,
  fetchAllAttendanceList
);
router.get(
  "/attendance/fetchAttendanceById/:attendanceId",
  validateTokenMiddleware,
  fetchAttendanceById
);
router.put(
  "/attendance/updateAttendance/:attendanceId",
  validateTokenMiddleware,
  updateAttendanceList
);
router.delete(
  "/attendance/deleteAttandance/:attendanceId",
  validateTokenMiddleware,
  deleteAttendanceList
);

// ---------------------------------------- Invoice Route ---------------------------------------------------------------------------------------

router.post("/invoice/createInvoice", validateTokenMiddleware, createInvoice);
router.get("/invoice/fetchInvoice", validateTokenMiddleware, fetchInvoiceData);
router.get(
  "/invoice/fetchAllInvoice",
  validateTokenMiddleware,
  fetchAllInvoiceData
);
router.put(
  "/invoice/updateInvoice/:invoiceId",
  validateTokenMiddleware,
  updateInvoice
);
router.delete(
  "/invoice/deleteInvoice/:invoiceId",
  validateTokenMiddleware,
  deleteInvoice
);

module.exports = router;