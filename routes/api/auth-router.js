import express from "express";
import userSchema from "../../schemas/user-schema.js";
import {validateBody} from "../../decorators/index.js"
import authController from "../../controllers/auth-controller.js";
import {authenticate} from "../../middlewares/index.js";
const authRouter = express.Router();

authRouter.post("signup", validateBody(userSchema.userSignupSchema), authController.signup);
authRouter.post("/signin", validateBody(userSchema.userSigninSchema), authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/signout", authenticate, authController.signout);
export default authRouter;