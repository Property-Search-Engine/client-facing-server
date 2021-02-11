const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const validateJWT = require("./middleware/jwt-middleware")

const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/user-routes")
const bookingsRouter = require("./routes/bookings-routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.get("/admin", validateJWT, (req, res, next) => res.status(200).send("Authorized"));
app.use("/user", userRouter);
app.use("/bookings", bookingsRouter);
app.use(errorMiddleware);

module.exports = app;
