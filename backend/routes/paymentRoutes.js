const {
  hadlePayment,
  handlePaymentSuccess,
} = require("../controller/hadlePayment");
const authMiddleware = require("../middleware/auth");

const router = require("express").Router();

// Route to create a checkout session
router.post("/create-checkout-session", authMiddleware, hadlePayment);
// Route to handle payment success and update user limit
router.post("/payment-success", authMiddleware, handlePaymentSuccess);
module.exports = router;
