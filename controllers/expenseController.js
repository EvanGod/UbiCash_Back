// controllers/expenseController.js
const Expense = require("../models/Expense");
const { uploadImageToCloud } = require('../utils/uploadToGoogleCloud');

const createExpense = async (req, res) => {
    const { nombre, descripcion, costo, ubicacion } = req.body;
  
    console.log("Ubicación recibida:", req.body.ubicacion);
  
    let parsedUbicacion = null;
    if (ubicacion) {
      try {
        parsedUbicacion = typeof ubicacion === "string" ? JSON.parse(ubicacion) : ubicacion;
        if (!parsedUbicacion.type || !Array.isArray(parsedUbicacion.coordinates)) {
          return res.status(400).json({ message: "El formato de ubicación es incorrecto" });
        }
      } catch (error) {
        return res.status(400).json({ message: "Error al parsear la ubicación" });
      }
    }
  
    try {
      let imagenUrl = null;
      if (req.file) {
        imagenUrl = await uploadImageToCloud(req.file);
      } else if (req.body.imagen) {
        imagenUrl = req.body.imagen;
      }
  
      const expense = await Expense.create({
        nombre,
        descripcion,
        imagen: imagenUrl,
        costo,
        ubicacion: parsedUbicacion,
        user: req.user.id
      });
  
      res.status(201).json(expense);
    } catch (error) {
      console.error("Error al crear el gasto", error);
      res.status(500).json({ message: "Error al crear el gasto", error: error.message });
    }
  };

const getExpenses = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    const expenses = await Expense.find({ user: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los gastos", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado o no autorizado" });
    }

    // Si se proporciona una nueva imagen, la subimos
    if (req.file) {
      expense.imagen = await uploadImageToCloud(req.file); // Subir imagen nueva a Google Cloud
    }

    expense.nombre = req.body.nombre || expense.nombre;
    expense.descripcion = req.body.descripcion || expense.descripcion;
    expense.costo = req.body.costo || expense.costo;
    expense.ubicacion = req.body.ubicacion || expense.ubicacion;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el gasto", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado o no autorizado" });
    }

    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Gasto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el gasto", error: error.message });
  }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
