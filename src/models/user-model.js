const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = require("./schemas/user")

const User = mongoose.model("User", UserSchema);

module.exports = User;