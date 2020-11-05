// Modulos de node
const express = require("express");
const router = express.Router();

// Modulos internos
const Album = require("../model/album");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");

// Rutas
// Obtener listado de fotos
router.get("/lista", auth, async (req, res) => {
  // Buscamos el usuario logueado
  const usuario = await Usuario.findById(req.usuario._id);
  // Si el usuario no existe
  if (!usuario) return res.status(401).send("Usuario no existe en BD");
  // Si el usuario si existe
  const album = await Album.find({ idUsuario: req.usuario._id });
  res.send(album);
});

// Registrar imagen
router.post(
  "/cargarArchivo",
  cargarArchivo.single("imagen"),
  auth,
  async (req, res) => {
    // Recibe protocolo http y https con el local o dominio
    const url = req.protocol + "://" + req.get("host");
    // verificamos si existe el usuario
    const usuario = await Usuario.findById(req.usuario._id);
    // si el usuario no existe
    if (!usuario) return res.status(400).send("No existe el usuario en BD");
    // Definimos la ruta de imagen como null
    let rutaImagen = null;
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
    } else {
      rutaImagen = null;
    }
    // guardamos en BD la imagen
    const album = new Album({
      idUsuario: usuario._id,
      nombre: req.body.name,
      imagen: rutaImagen,
    });
    const result = await album.save();
    res.status(201).send(result);
  }
);

// exports
module.exports = router;
