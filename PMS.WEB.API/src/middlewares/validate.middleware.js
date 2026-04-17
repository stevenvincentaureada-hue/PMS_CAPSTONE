const validate = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === "",
    );

    if (missing.length > 0) {
      return res.status(422).json({
        message: "Validation failed.",
        missing_fields: missing,
      });
    }

    next();
  };
};

module.exports = validate;
