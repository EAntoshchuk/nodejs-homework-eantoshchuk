import express from "express";
import logger from "morgan";
import cors from "cors";
import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";
import bcrypt from "bcryptjs";

const hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, 10)
  const compareResult1 = await bcrypt.compare(password, result);
  const compareResult2 = await bcrypt.compare("123456", result);
}
hashPassword("123456");



const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
