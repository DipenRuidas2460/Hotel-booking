const express = require("express");
const router = express.Router();

const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
} = require("../controllers/customerController");

const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

const { accessChat, fetchChats } = require("../controllers/chatController");

const {
  createPaymentData,
  fetchPaymentData,
  stripePaymentApi,
} = require("../controllers/paymentController");

const {
  createTruckInfo,
  fetchTruckInfo,
  updateTruckInfo,
  deleteTruckInfo,
} = require("../controllers/truckInfoController");

const { validateTokenMiddleware } = require("../middleware/auth");
const {
  createTransportData,
  fetchTransportData,
} = require("../controllers/transportController");
const {
  createLocationData,
  fetchLocationData,
} = require("../controllers/locationController");
const {
  createCommisionData,
  fetchCommisionData,
} = require("../controllers/commisionController");
const {
  createWalletData,
  fetchWalletData,
} = require("../controllers/walletController");
const {
  createReviewData,
  fetchReviewData,
} = require("../controllers/reviewController");
const {
  createPayoutData,
  fetchPayoutData,
} = require("../controllers/payoutController");

// -------------------- Customer Profile Route ----------------------------------------------------------------------------------

router.post("/customer/register", addUser);
router.post("/customer/login", login);
router.get("/customer/logout", logOut);
router.post("/customer/forgotpass", forgetPass);
router.post("/customer/resetpass", fpUpdatePass);
router.put("/customer/update", validateTokenMiddleware, updateUser);
router.patch(
  "/customer/updatePassword",
  validateTokenMiddleware,
  updatePassword
);
router.get("/customer/getUserById", validateTokenMiddleware, getUserById);
router.get("/customer/getAllUsers", validateTokenMiddleware, getAllUsers);

// --------------------- Chat Routes ----------------------------------------------------------------------------------------------

router.post("/chat", validateTokenMiddleware, accessChat);
router.get("/chat", validateTokenMiddleware, fetchChats);

// --------------------- Message Routes -------------------------------------------------------------------------------------------

router.post("/message", validateTokenMiddleware, sendMessage);
router.get("/message/:chatId", validateTokenMiddleware, allMessages);

// ---------------------- Truck Routes -----------------------------------------------------------------------------------------------

router.post("/create-truckData", validateTokenMiddleware, createTruckInfo);
router.get("/truckData", validateTokenMiddleware, fetchTruckInfo);
router.put("/truckData/:truckId", validateTokenMiddleware, updateTruckInfo);
router.delete("/truckData/:truckId", validateTokenMiddleware, deleteTruckInfo);

// ------------------------- Transport Routes -------------------------------------------------------------------------------------------

router.post("/create-transport", validateTokenMiddleware, createTransportData);
router.get("/transport", validateTokenMiddleware, fetchTransportData);

// ------------------------- Location Routes --------------------------------------------------------------------------------------------

router.post("/create-location", validateTokenMiddleware, createLocationData);
router.get("/location", validateTokenMiddleware, fetchLocationData);

// ---------------------- Payment Routes -------------------------------------------------------------------------------------------------

router.post("/create-payment", validateTokenMiddleware, createPaymentData);
router.get("/payment", validateTokenMiddleware, fetchPaymentData);

// ------------------------ Commision Routes ----------------------------------------------------------------------------------------------

router.post("/create-commision", validateTokenMiddleware, createCommisionData);
router.get("/commision", validateTokenMiddleware, fetchCommisionData);

// ------------------------- Wallet Routes -------------------------------------------------------------------------------------------------

router.post("/create-wallet", validateTokenMiddleware, createWalletData);
router.get("/wallet", validateTokenMiddleware, fetchWalletData);

// -------------------------- Review Routes -------------------------------------------------------------------------------------------------

router.post("/create-review", validateTokenMiddleware, createReviewData);
router.get("/review", validateTokenMiddleware, fetchReviewData);

// --------------------------- Payout Routes -----------------------------------------------------------------------------------------------

router.post("/create-payout", validateTokenMiddleware, createPayoutData);
router.get("/payout", validateTokenMiddleware, fetchPayoutData);

// --------------------------- Stripe Payment Api -------------------------------------------------------------------------------------------

router.post(
  "/api/create-checkout-session",
  validateTokenMiddleware,
  stripePaymentApi
);

module.exports = router;
