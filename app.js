const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");

const router = require("./routes/userRoutes");

dotenv.config({
  path: "./config.env",
});

mongoose.connect(
  process.env.MONGO_URL || process.env.DATABASE_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully connected to mongoDB");
  }
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
