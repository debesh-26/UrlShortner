import React, { useState, useEffect } from "react";
import axios from "axios";
import "./URLShortener.css";
import { MdDeleteForever } from "react-icons/md";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://urlshortner-2ndt.onrender.com/url/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShortenedUrls(response.data); // Set previously created URLs
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
      const newShortenedUrl = {
        _id: response.data._id, // Generate a temporary ID
        shortid: response.data.shortid,
        redirectUrl: response.data.redirectUrl, // URL entered by the user
        visitedHistory: [], // No clicks initially
        createdAt: new Date().toISOString(), // Current timestamp
        clicks: 0, // Start with 0 clicks
        status: "Active", // Default status
      };

      setShortenedUrls((prev) => [...prev, newShortenedUrl]);
      setUrl("");
    } catch (error) {
      setError("Failed to shorten the URL");
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
      console.log(shortenedUrls);
      console.error("Error deleting URL", error);
    }
  };

  return (
    <div className="url-shortener">
      <div className="box">
        <h2>Paste the URL to be shortened </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Shorten Now!</button>
        </form>
      </div>

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
          {/* {shortenedUrls.map((url, index) => (
            <tr key={index}>
              <td>
                <a href={url.shortLink} target="_blank" rel="noopener noreferrer">
                  {url.shortLink}
                </a>
              </td>
              <td>{url.originalLink}</td>
              <td>{url.clicks}</td>
              <td>{url.status}</td>
              <td>{url.date}</td>
            </tr>
          ))} */}
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
              <td>Active</td> {/* Assuming all URLs are active */}
              <td>{new Date(url.createdAt).toLocaleDateString()}</td>
              <td>
                <MdDeleteForever
                  size={20}
                  onClick={() => handleDelete(url._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLShortener;
