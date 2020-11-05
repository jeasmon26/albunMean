// Modulos internos
const express = require("express");
const mongoose = require("mongoose");

// Modulos creados
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const album = require("./routes/album");

// App
const app = express();
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/album", album);

// Pruerto de ejecucion
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en puerto: " + port));

// Registro en Mongo
mongoose
  .connect("mongodb://albummeanbd/", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion con mongo : OK"))
  .catch((error) => console.log("Conexion con mongo: OFF"));
