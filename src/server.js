const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const auth = require("./middleware/auth-middleware")
const bookingsRouter = require("./routes/bookings-routes");
const adminsRouter = require("./routes/admin-serv-routes");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();


app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.use(auth());
app.use("/bookings", bookingsRouter);
//app.use("/user", userRouter);
app.use(errorMiddleware);

module.exports = app;
