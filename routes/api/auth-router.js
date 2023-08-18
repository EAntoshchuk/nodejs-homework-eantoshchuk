import express from "express";
import userSchema from "../../schemas/user-schema.js";
import {validateBody} from "../../decorators/index.js"
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("signup", validateBody(userSchema.userSignupSchema), authController.signup);
authRouter.post("/singin", validateBody(userSchema.userSigninSchema), authController.signin);

export default authRouter;