const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, "El nombre del gasto es obligatorio"] },
    descripcion: { type: String, required: false },
    imagen: { type: String, required: false },
    costo: { type: Number, required: [true, "El costo es obligatorio"], min: [0, "El costo no puede ser negativo"] },
    ubicacion: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number], // [longitud, latitud]
            required: true,
            validate: {
                validator: function (coords) {
                    return Array.isArray(coords) && coords.length === 2;
                },
                message: "Las coordenadas deben contener exactamente dos valores: [longitud, latitud]"
            }
        }
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
  },
  { timestamps: true }
);

// **Agrega un índice geoespacial para consultas geográficas**
ExpenseSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model("Expense", ExpenseSchema);
