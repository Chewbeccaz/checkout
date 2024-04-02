const express = require("express");
const { createCheckoutSession } = require("./stripe.controllers");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
