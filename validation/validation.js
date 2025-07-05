const yup = require("yup");

const registerSchema = yup.object({
  body: yup.object({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
  }),
});

const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
});

module.exports = { registerSchema, loginSchema };
