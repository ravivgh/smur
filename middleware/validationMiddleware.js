const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validate({ body: req.body }, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: "Validation error" });
  }
};
module.exports = validationMiddleware;
