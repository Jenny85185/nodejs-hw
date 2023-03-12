const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl:{
      type:String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = model("user", userSchema);

const registerJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string().min(6),
  subscription: Joi.string(),
});

const verifyEmailJoiSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  User,
  registerJoiSchema,
  loginJoiSchema,
  verifyEmailJoiSchema
};