const Customer = require("../models/customer");
const Payment = require("../models/payment");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentData = async function (req, res) {
  try {
    const { transportId, transactionId, paymentStatus, amount } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const data = {
        customerId: req.person.id,
        transportId,
        transactionId,
        amount,
        paymentStatus,
      };

      const paymentData = await Payment.create(data);
      return res.status(201).json({
        status: true,
        message: "Payment Data created Successfully!",
        paymentData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchPaymentData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "role"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const paymentData = await Payment.findAll({
        where: {
          customerId: req.person.id,
        },
        include: [
          {
            model: Customer,
            attributes: ["id", "fullName", "email", "role"],
          },
        ],
      });

      if (paymentData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        paymentData: paymentData,
      });
    } else if (userData.role === "admin") {
      const allPaymentData = await Payment.findAll({});

      if (allPaymentData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allPaymentData: allPaymentData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const stripePaymentApi = async function (req, res) {
  try {
    const { item } = req.body;

    const newItem = [item];

    const lineItems = newItem.map((el) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: el.name,
        },
        unit_amount: el.amount * 100,
      },
      quantity: el.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createPaymentData,
  fetchPaymentData,
  stripePaymentApi,
};
