import db from '../../../models/index'

const bcrypt = require('bcrypt');
const saltRounds = 10;

let UpdateUser = async (body) => {
    if (body) {
        const checkUsernameExist = await db.Users.findOne({
            where: { username: body.username }
        });
        if (checkUsernameExist === null) {
            return {errorCode3 : "Username doesn't exist"}
        }
        try {
            let passwordHash = await bcrypt.hash(body.password, saltRounds);
            await db.Users.update(
                { password: passwordHash },
                { where: { username: body.username } }
                
            )
        return {message : "Change password is successfully!"}
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = UpdateUser