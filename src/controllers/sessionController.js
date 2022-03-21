import Login from '../services/auth/Login'
import Logout from '../services/auth/Logout'

// For Login User
const login = async (req, res) => {
    if (req.body) {
        try {
            const userLogin = await Login(req, res);
            console.log("userLogin",userLogin?.user)
            if (userLogin?.user !== null) {
                return res.status(200).json({ userLogin: userLogin })
            }
        }
        catch (err) {
            console.log(err);
            return res.status(503).json({ message: "Something wrong !" })
        }
    }
    else {
        return res.status(300).json("body is empty!")
    }
}
// For Login User
const logout = async (req, res) => {
    if (req.body) {
        try {
            await Logout(req, res);
            return res.status(200).json({ message: "You're logout !" })
        }
        catch (err) {
            console.log(err);
            return res.status(503).json({ message: "Something wrong !" })
        }
    }
    else {
        return res.status(300).json("body is empty!")
    }
}


module.exports = {
    login,
    logout
};