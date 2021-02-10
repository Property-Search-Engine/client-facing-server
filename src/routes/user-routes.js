const { Router } = require("express");
const { validateRegisterData, validateUpdateData } = require("../middleware/validators/user-validator");

const userRouter = Router();

const {
    register,
    login,
    deleteUser,
    update,
} = require("../controllers/user-controller");

userRouter.post("/register", validateRegisterData, register);
userRouter.post("/login", login);
userRouter.delete("/", deleteUser);
userRouter.put("/profile", validateUpdateData, update);

module.exports = userRouter;
