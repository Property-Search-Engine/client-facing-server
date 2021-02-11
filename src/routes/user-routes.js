const { Router } = require("express");
const { validateRegisterData, validateUpdateData } = require("../middleware/validators/user-validator");
const auth = require("../middleware/auth-middleware")

const userRouter = Router();

const {
    register,
    login,
    deleteUser,
    update,
} = require("../controllers/user-controller");

userRouter.post("/register", validateRegisterData, register);
userRouter.post("/login", auth, login);
userRouter.delete("/", auth, deleteUser);
userRouter.patch("/profile", auth, validateUpdateData, update);

module.exports = userRouter;
