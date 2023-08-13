import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `add "name" please`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required().messages({
    "any.required": `add "phone" please`,
  }),
});

const contactFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required().messages({"any.required": `missing required "favourite" field`})
});

export default {contactSchema, contactFavouriteSchema};
