const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { username, email, celular, password } = req.body;

  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ message: "El username ya está registrado" });
    
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "El email ya está registrado" });

    const celularExists = await User.findOne({ celular });
    if (celularExists) return res.status(400).json({ message: "El celular ya está registrado" });

    const user = await User.create({ username, email, celular, password });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        celular: user.celular
      });
    } else {
      res.status(400).json({ message: "Datos inválidos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      user.lastLogin = new Date();
      await user.save(); 

      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        celular: user.celular,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser };
