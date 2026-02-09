const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

const port = process.env.PORT || 5000;

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("Database connection Established...");
    const server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database Error...");
  });
