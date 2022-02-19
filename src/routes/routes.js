const express = require('express');
const { usersView,addUser } = require('../controllers/usersController');
// import usersControllers from '../controllers/usersController'
const router = express.Router();



let initRoutes = (app) => {

    // Get users
    router.get('/users', usersView);


    // RestAPI
    router.post("/api/add-user", addUser);

    return app.use("/", router)
}

module.exports = initRoutes;