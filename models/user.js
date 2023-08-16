import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/user-constant";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const userSchema = new Schema({
name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    match: emailRegexp,
    unique: true,
},
password: {
    type: String,
    required: true,
    minlength: 6,
},
}, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", handleUpdateValidate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;