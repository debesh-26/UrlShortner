const User = require("../models/user");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config(); 

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


async function hadlePayment(req, res) {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 50000, // amount in paise, so 50000 means ₹500
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment after successful payment
    });

    console.log("Order created successfully:", order);
    res.json(order);
  } catch (error) {
    console.error("Error creating payment order:", error); // Log full error
    res.status(500).json({ message: "Payment creation failed", error: error });
  }
}

async function handlePaymentSuccess(req, res) {
  // try {
  //   const { session_id } = req.body; // Get session ID from frontend
  //   const session = await stripe.checkout.sessions.retrieve(session_id); // Fetch session details from Stripe

  //   // Get the authenticated user (from req.user provided by authMiddleware)
  //   const user = await User.findById(req.user._id);

  //   // If payment was successful
  //   if (session.payment_status === "paid") {
  //     // Update the user's account to reflect the payment
  //     user.paidService = true;
  //     user.urlLimit += 50; // Add 50 more URLs to their limit (adjust as needed)
  //     await user.save(); // Save updated user

  //     res.status(200).json({ message: "Payment successful, account upgraded" });
  //   } else {
  //     res.status(400).json({ message: "Payment not completed" });
  //   }
  // } catch (error) {
  //   console.error("Error in payment success handler:", error);
  //   res.status(500).json({ message: "Payment verification failed" });
  // }

  try {
    const { paymentId } = req.body;
    console.log(paymentId);
    const userId = req.user.id;

    // Update the user's limit after successful payment
    await User.findByIdAndUpdate(userId, {
      $set: { urlLimit: 50, paidService: true }, // Reset the limit after successful payment
    });

    res
      .status(200)
      .json({ message: "Payment successful. You can now shorten more URLs." });
  } catch (error) {
    res.status(500).json({ message: "Payment confirmation failed" });
  }
}
module.exports = { hadlePayment, handlePaymentSuccess };
