// const express= require("express");
// const router= express.Router();

const {
  handleGenerteNewSortUrl,
  handleAnalytics,
  handleFetchAllUrlofUser,
  handleDeleteUrl,
} = require("../controller/url");
const authMiddleware = require("../middleware/auth");

const router = require("express").Router();

router.post("/", authMiddleware, handleGenerteNewSortUrl);
router.get("/analytics/:shortid", authMiddleware, handleAnalytics);
router.get("/user", authMiddleware, handleFetchAllUrlofUser);
router.delete("/:id", authMiddleware, handleDeleteUrl);
module.exports = router;
