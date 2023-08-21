import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name this contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", function (next) {
  // console.log("enter pre hook");
  this.options.runValidators = true;
  // console.log("running validation");
  next();
});

contactSchema.post("save", (er, _, next) => {
  er.status = 400;
  next();
});

contactSchema.post("findOneAndUpdate", (er, _, next) => {
  er.status = 400;
  next();
});

const Contact = model("contact", contactSchema);

export default Contact;
