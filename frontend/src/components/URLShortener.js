import React, { useState, useEffect } from "react";
import axios from "axios";
import "./URLShortener.css";
import { MdDeleteForever } from "react-icons/md";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://urlshortner-2ndt.onrender.com/url/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortenedUrls(response.data); // Seting previously created URLs
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  // Fetch URLs on component mount
  useEffect(() => {
    fetchUrls();
  }, []);

  // Function to handle URL submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      alert("URL is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://urlshortner-2ndt.onrender.com/url",
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.data.msg === "Free limit exceeded. Please upgrade to continue."
      ) {
        setLimitExceeded(true);
        setShowPopup(true);
      } else {
        const newShortenedUrl = {
          _id: response.data._id, // Generating a temporary ID
          shortid: response.data.shortid,
          redirectUrl: response.data.redirectUrl, // URL entered by the user
          visitedHistory: [], // No clicks initially
          createdAt: new Date().toISOString(), // Current timestamp
          clicks: 0, // Start with 0 clicks
          status: "Active", // Default status
        };

        setShortenedUrls((prev) => [...prev, newShortenedUrl]);
        setUrl("");
      }
    } catch (error) {
      setError("Failed to shorten the URL");
    }
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://urlshortner-2ndt.onrender.com/payment/create-checkout-session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check if Razorpay is available
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        setPaymentProcessing(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: response.data.amount,
        currency: "INR",
        name: "URL Shortener Premium Plan",
        description: "Payment for exceeding the free limit",
        order_id: response.data.orderId, 
        handler: async function (paymentResponse) {
          await axios.post(
            "https://urlshortner-2ndt.onrender.com/payment/payment-success",
            {
              paymentId: paymentResponse.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert(
            "Payment successful! You can now continue creating short URLs."
          );
          setLimitExceeded(false); 
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order for payment", error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleLinkClick = async (shortId) => {
    await handleFetchAnalytics(shortId);
    await fetchUrls();
  };

  // Function to fetch analytics
  const handleFetchAnalytics = async (shortId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://urlshortner-2ndt.onrender.com/url/analytics/${shortId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShortenedUrls((prevUrls) =>
        prevUrls.map((url) =>
          url.shortid === shortId
            ? {
                ...url,
                clicks: response.data.visitedHistory
                  ? response.data.visitedHistory.length
                  : 0,
              }
            : url
        )
      );
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  //deleting the url
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://urlshortner-2ndt.onrender.com/url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUrl = shortenedUrls.filter((url) => url._id !== id);
      setShortenedUrls(updatedUrl);
    } catch (error) {
      console.error("Error deleting URL", error);
    }
  };
  const closePopup = () => {
    setShowPopup(false); 
  };
  return (
    <div className="url-shortener">
      <div className="box">
        <h2>Paste the URL to be shortened </h2>
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className="btn">
            Shorten Now!
          </button>
        </form>
      </div>
      {showPopup && limitExceeded && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <p className="msg">
              Your free limit is exceeded. Please make a payment to continue.
            </p>
            <button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className="make-payment-button"
            >
              {paymentProcessing ? "Processing..." : "Make Payment"}
            </button>
          </div>
        </div>
      )}
      <p
        style={{
          fontSize: "20px",
          fontWeight: "500",
          color: "rgb(31, 169, 185)",
        }}
      >
        Your Generated Urls Are Here
      </p>
      <div className="shortened-urls-wrapper">
        <table className="shortened-urls">
          <thead>
            <tr>
              <th>Short Link</th>
              <th>Original Link</th>
              <th>Clicks</th>
              <th>Status</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {shortenedUrls.map((url, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={`https://urlshortner-2ndt.onrender.com/${url.shortid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(url.shortid)}
                  >
                    {`https://urlshortner-2ndt.onrender.com/${url.shortid}`}
                  </a>
                </td>
                <td>{url.redirectUrl}</td>
                <td>{url.visitedHistory.length}</td>
                <td>Active</td>
                <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                <td>
                  <MdDeleteForever
                    className="icons"
                    onClick={() => handleDelete(url._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default URLShortener;
