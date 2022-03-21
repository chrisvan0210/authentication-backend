import db from '../../../models/index'

const  GetRefreshToken = async (username) => {
    if (username) {
        try {
            const refreshToken = await db.Refresh_Tokens.findOne({
                where : {username : username}
            })
            return refreshToken.dataValues.refreshToken;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = GetRefreshToken