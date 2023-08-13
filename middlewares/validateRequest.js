import { HttpError } from "../helpers/index.js";

const validateRequest = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

export default validateRequest;
