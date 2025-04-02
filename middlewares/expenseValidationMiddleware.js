const { body, validationResult } = require("express-validator");

const validateExpense = [
  body("nombre").notEmpty().withMessage("El nombre del gasto es obligatorio"),
  body("costo")
    .isNumeric()
    .withMessage("El costo debe ser un número válido")
    .isFloat({ min: 0 })
    .withMessage("El costo no puede ser negativo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = { validateExpense };

    // body("ubicacion")
    // .optional()
    // .custom((value) => {
    //   if (value) {
    //     if (typeof value !== 'object' || !value.type || value.type !== 'Point') {
    //       throw new Error('La ubicación debe ser un objeto con type: "Point"');
    //     }
    //     if (!Array.isArray(value.coordinates) || value.coordinates.length !== 2 || 
    //         typeof value.coordinates[0] !== 'number' || typeof value.coordinates[1] !== 'number') {
    //       throw new Error('Las coordenadas deben ser un array con dos números: [longitud, latitud]');
    //     }
    //   }
    //   return true;
    // })
    