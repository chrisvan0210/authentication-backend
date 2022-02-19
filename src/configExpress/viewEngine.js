import express from "express"

let configViewEngine = (app) =>{
    //config
    app.use(express.static("./src/public")); // client and server get resource from public folder
    app.set("view engine", "ejs"); // alow logic type inside html, (like jsp of java or blade of php)
    app.set("views","./src/views");
}

module.exports = configViewEngine