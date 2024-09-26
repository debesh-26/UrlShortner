const express = require("express");
const { handleConnection } = require("./connect");
const app = express();
const urlRouter = require("./routes/url");
const URL = require("./models/url");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());

handleConnection(process.env.MONGO_URL).then(() =>
  console.log("database connected")
);

app.use("/url", urlRouter);
app.use("/auth", authRouter);
app.get("/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  console.log("shortId received:", shortid);

  const result = await URL.findOneAndUpdate(
    { shortid },
    { $push: { visitedHistory: Date.now() } },
    { new: true } // returns the updated document
  );

 
    return res.redirect(result.redirectUrl);
  
});

app.listen(3000, () => console.log("server connected at port 3000"));
