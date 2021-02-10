const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const bookingsRouter = require("./routes/bookings-routes");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.use("/bookings", bookingsRouter);
//app.use("/user", userRouter);
app.use(errorMiddleware);

module.exports = app;
