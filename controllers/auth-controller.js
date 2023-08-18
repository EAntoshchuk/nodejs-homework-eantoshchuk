import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import {ctrlWrapper} from "../decorators/index.js";

const signup = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email has been used already")
    }
    const hashPassword = await bcrypt.has(password, 10);
const newUser = await User.create({...req.body, password: hashPassword});

res.status(201).json({
    name: newUser.name,
    email: newUser.email,
})
}

const singin = async(req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user) {
    throw HttpError(401, "email or password invalid");
}

const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare) {
    throw HttpError(401, "email or password invalid");
}

const token = "";
res.json({
    token,
})
}
export default{
    signup: ctrlWrapper(signup),
    singin: ctrlWrapper(singin),
}