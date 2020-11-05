// modulos de node

const jwt = require("jsonwebtoken");

// crear la funcion meddleware

function auth (req, res, next) {

 let jwtToken = req.header("Authorization");

 //separo el Bearer del token  
  jwtToken = jwtToken.split(" ")[1];

 //si no exist el token 
 if(!jwtToken) return res.status(401).send("no hay token para validar")

 //si existe el jwt

 try {
     const payload = jwt.verify(jwtToken, "clave");
     req.usuario = payload;
     next();
 } catch (error) {
      res.status(401).send("Token no valido, sin autorizacion a procesos");
 }
}

module.exports = auth;