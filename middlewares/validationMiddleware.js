const { body, validationResult } = require("express-validator");

const validateUser = [
  body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("celular")
    .matches(/^\d{10}$/)
    .withMessage("El celular debe tener exactamente 10 dígitos"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateUser };
