const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerteNewSortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ msg: "URL is required" });
  }
  const shortId = shortid();
  const newUrl = await URL.create({
    shortid: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
    user: req.user._id  // Associate the URL with the logged-in user
  });
  req.user.urls.push(newUrl._id);
  await req.user.save();

  res.status(200).json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortid = req.params.shortid;
  const result = await URL.findOne({ shortid, user: req.user._id });  // Ensure only the user can access their own URLs
  
  if (!result) {
    return res.status(404).json({ msg: "Short URL not found" });
  }
  
  res.status(200).json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}
async function handleFetchAllUrlofUser(req,res){
    const userid=req.user.id;
    try{
      const urls= await URL.find({user:userid});
      res.status(200).json(urls);
    }
    catch(err){
      res.status(500).json({ msg: 'Error fetching URLs' });
    }
}

module.exports = { handleGenerteNewSortUrl, handleAnalytics ,handleFetchAllUrlofUser};
