import db from '../../../models/index'
import StoreRefreshToken from './StoreRefreshToken'
import { jwtSignToken,jwtSignRefreshToken } from '../utils/jwtSign';

var cookie = require('cookie');
const bcrypt = require('bcrypt');


let Login = async (req, res) => {
    if(req.body.username && req.body.password){
        try {
            const userLogin = await db.Users.findOne({
                where: { username: req.body.username },
                attributes: ['username', 'email', 'password']
            });
            if (userLogin !== null) {
                let passwordCheck = await bcrypt.compare(req.body.password, userLogin.dataValues.password);
                if (passwordCheck) {
                    let payload = {
                        username: userLogin.username,
                        sessionValidate : true
                    }
    
                    const accessToken =jwtSignToken(payload);
                    const refreshToken =jwtSignRefreshToken(payload);
                    
                    res.setHeader('Set-Cookie', cookie.serialize('auth', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development', // not require use https on dev environment
                        sameSite: true, //same with strict
                        maxAge: 3600,
                        path: '/'
                    }))
                    let storeToken = {
                        username: userLogin.username,
                        refreshToken: refreshToken
                    }
                    await StoreRefreshToken(storeToken);
                    return { message: "Login succesfully !", user : payload }
    
                } else {
                    return { message: "Wrong username or password !",user : null}
                }
            } else {
                return { message: "Wrong username or password !",user : null}
            }
        } catch (err) {
            console.log(err)
        }
    }
    return { message: "Empty body!",user : null}
}

module.exports = Login