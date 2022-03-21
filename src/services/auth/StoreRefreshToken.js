import db from '../../../models/index'

let StoreRefreshToken = async (storeToken) => {
    if (storeToken) {
        try {
            const refreshTokenExist = await db.Refresh_Tokens.findOne({
                where : {username : storeToken.username}
            })
            if(refreshTokenExist !== null){
                await db.Refresh_Tokens.update(
                    { refreshToken: storeToken.refreshToken },
                    { where: { username: storeToken.username } }
                )
                return;
            }
            await db.Refresh_Tokens.create({
                username : storeToken.username,
                refreshToken: storeToken.refreshToken
            })

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = StoreRefreshToken