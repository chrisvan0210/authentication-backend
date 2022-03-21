import CreateUser from '../services/user/CreateUser'
import GetUser from '../services/user/GetUser'
import UpdateUserPW from '../services/user/UpdateUserPW'
import DeleteUser from '../services/user/DeleteUser'



// For View 
const homeView = (req, res) => {
    res.render("home.ejs", {
    });
}
const usersView = (req, res) => {
    res.render("users.ejs", {
    });
}
// For Create User
let addUser = async (req, res) => {
    if (req.body) {
        try {
            const userInfo = await CreateUser(req, res)
            if (userInfo) {
                return res.status(200).json({userInfo:userInfo})
            }
        }
        catch (err) {
            console.log(err);
            return res.status(503)
        }
    }
    else {
        return res.status(300).json("body is empty!")
    }
}
// For Get User
let getUser = async (req, res) => {
    if (req.body) {
        try {
            const userInfo = await GetUser(req.body)
            return res.status(200).json({ data: userInfo })
        }
        catch (err) {
            console.log(err);
            return res.status(503)
        }
    }
    return res.status(300).json("body is empty!")
}
// For Update User
let updateUser = async (req, res) => {
    if (req.body) {
        try {
            let response = await UpdateUserPW(req.body)
            return res.status(200).json(response)
        }
        catch (err) {
            console.log(err);
            return res.status(503)
        }
    }
    return res.status(300).json("body is empty!")
}
// For Delete User
let deleteUser = async (req, res) => {
    if (req.body) {
        try {
            let response = await DeleteUser(req.body)
            if(response){
                return res.status(200).json(req.body.username +" "+ response.message);
            }
            return res.status(300).json("Delete user failed!")
        }
        catch (err) {
            console.log(err);
            return res.status(503)
        }
    }
    return res.status(300).json("body is empty!")
}





module.exports = {
    homeView,
    usersView,
    addUser,
    getUser,
    updateUser,
    deleteUser
};