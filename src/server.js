const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const auth = require("./middleware/auth-middleware")
const { validateJWT } = require("./middleware/stsauth-middleware")

const app = express();

const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/user-routes")

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.get("/admin", validateJWT, (req, res, next) => res.status(200).send("Authorized"))

app.use("/user", userRouter);
app.use(auth());

app.use(errorMiddleware);

module.exports = app;
