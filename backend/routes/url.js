// const express= require("express");
// const router= express.Router();

const { handleGenerteNewSortUrl, handleAnalytics ,handleFetchAllUrlofUser} = require("../controller/url");
const authMiddleware = require("../middleware/auth");

const router= require("express").Router();

router.post('/',authMiddleware,handleGenerteNewSortUrl);
router.get('/analytics/:shortid',authMiddleware,handleAnalytics);
router.get('/user',authMiddleware,handleFetchAllUrlofUser)
module.exports=router; 