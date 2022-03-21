import db from '../../../models/index'
// const db = require('../../models/index')
import StoreRefreshToken from '../auth/StoreRefreshToken'
import { jwtSignToken, jwtSignRefreshToken } from '../utils/jwtSign';

var cookie = require('cookie');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let CreateUser = async (req, res) => {
    
    const checkUsernameExist = await db.Users.findOne({
        where: { username: req.body.username }
    });
    const checkEmailExist = await db.Users.findOne({
        where: { email: req.body.email }
    });
    if (checkUsernameExist !== null) {
        return { errorCode1: "Username already exist" }
    }
    else if (checkEmailExist !== null) {
        return { errorCode2: "Email already exist" }
    }


    let passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    try {
        let user = {
            username: req.body.username,
            password: passwordHash,
            email: req.body.email
        }
        
        //add to db
        await db.Users.create(user);

        const userJustCreated = await db.Users.findOne({
            where: { username: req.body.username }
        });
        if (userJustCreated && userJustCreated !== null) {
            let payload = {
                username: userJustCreated.username,
                sessionValidate : true
            }

            const accessToken = jwtSignToken(payload);
            const refreshToken = jwtSignRefreshToken(payload);

            res.setHeader('Set-Cookie', cookie.serialize('auth', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // not require use https on dev environment
                sameSite: 'strict', //same with true
                maxAge: 3600,
                path: '/'
            }))

            let storeToken = {
                username: userJustCreated.username,
                refreshToken: refreshToken
            }
            await StoreRefreshToken(storeToken);

            return { message: "Register succesfully !", user: payload }
        }
        return { message: "Something Wrong !" };

    } catch (err) {
        console.log(err)
    }
}


module.exports = CreateUser