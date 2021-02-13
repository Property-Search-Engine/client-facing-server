const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/user-routes")
const bookingsRouter = require("./routes/bookings-routes");
const propertiesRouter = require("./routes/properties-routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.use("/user", userRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);
app.use(errorMiddleware);

module.exports = app;
