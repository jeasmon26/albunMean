// Modulos de node
const multer = require("multer");

// directorio donde quedaran guardadas las imagenes
const directorio = "./public/";

// DiskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Si llega null se va a un error
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    // Fecha de la imagen y se respeta el nombre de la imagen se cambia espaso por -
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  },
});

// Cargar archivos al proyecto
const cargarArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
   
    if (file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"  ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(
            new Error("Solo aceptamos estos tipos de archivos: png - jpg - gif")
          );
      }

  },
});

// Exports
module.exports = cargarArchivo;