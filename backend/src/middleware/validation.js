const { body, validationResult } = require("express-validator");

// Validation rules
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  };
};

// Common validation rules
const authValidation = {
  register: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be 2-50 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid 10-digit phone number"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  login: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  createStaff: [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid 10-digit phone number"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("position")
      .notEmpty()
      .withMessage("Position is required")
      .isIn(["kitchen", "waiter", "delivery", "manager", "cashier"])
      .withMessage("Invalid position"),
    body("department")
      .notEmpty()
      .withMessage("Department is required")
      .isIn(["kitchen", "front_of_house", "delivery", "management", "admin"])
      .withMessage("Invalid department"),
  ],
};

module.exports = {
  validate,
  authValidation,
};
