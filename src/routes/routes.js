const path  = require('path');

const express = require('express');
const { homeView, usersView, addUser, getUser, updateUser, deleteUser } = require('../controllers/usersController');
const { login, logout } = require('../controllers/sessionController');
const { addNews } = require('../controllers/postsController');
const { authenticateToken } = require('../services/auth/authenticateToken');

const router = express.Router();

const uploadMiddleware = (req, res, next) => {
   
    if (req.files) {
      
        const file = req.files.file;
        // let timeStamp = new Date(Date.now()).toLocaleString().split(',')[0].replaceAll("/", '-');
        let timeStamp = Date.now();
        let fileName = timeStamp + "-" + file.name;
        let staticPath = path.join(__dirname, '../../public');
        let uploadPath = `${staticPath}/upload/${fileName}`
        file.mv(uploadPath, err => {
            if (err) {
                console.error("upload msg:",err);
            }
        });
        
        req.files.file.name = {fileName};
    }
    next();
}

let initRoutes = (app) => {

    // View
    router.get('/', homeView);
    router.get('/users', usersView);

    // User
    router.post("/api/add-user", addUser);
    router.get("/api/get-user", getUser);
    router.post("/api/update-user", updateUser);
    router.post("/api/delete-user", deleteUser);
    router.post("/api/login", login);
    router.post("/api/logout", logout);

    // Post
    router.post("/api/add-news", authenticateToken, uploadMiddleware, addNews);


    return app.use("/", router)
}

module.exports = initRoutes;