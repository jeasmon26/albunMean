// Modulos de node
const express = require("express");
const router = express.Router();

// Modulos internos
const { Usuario } = require("../model/usuario");

// Ruta
router.post("/", async (req, res) => {
  // Validamos que exista el correo
  const usuario = await Usuario.findOne({ correo: req.body.correo });
  // Si no existe el correo
  if (!usuario)
    return res.status(400).send("Correo o constraseña no son validos");
  // Si esl pass no existe
  if (usuario.pass !== req.body.pass)
    return res.status(400).send("Correo o constraseña no son validos");
  // Generamos el JWT
  const jwtToken = usuario.generateJWT();
  res.status(200).send({ jwtToken });
});

// Exports
module.exports = router;
