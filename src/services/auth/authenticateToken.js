import GetRefreshToken from './GetRefreshToken'
const accessKey = process.env.TOKEN_SECRET;
const jwt = require('jsonwebtoken');



// Middleware to check jwt token
const authenticateToken = (req, res, next) => {
    let token;
    if (req.headers && req.headers.cookie) {
        token = req.headers.cookie.split("=")[1];
    }
    // else {
    //     const authHeader = req.headers['authorization']
    //     token = authHeader && authHeader.split(' ')[1]
    //     console.log("cookie2", token);
    // }
    else{
        return res.status(404).send("You're not authenticated!");
    }

    // Verify current accessToken
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) {
            // If Token is expired!
            // Process Convert refreshToken to accessToken

            // token is valid but just expired
            let userfromToken;
            if (err.name === 'TokenExpiredError' && token) {
                userfromToken = jwt.verify(token, accessKey, { ignoreExpiration: true });
            }
            else{
                return res.status(404).send("Middleware You are not authenticated!")
            }
         
            let newRefreshToken = await GetRefreshToken(userfromToken.username);
            console.log("newRefreshToken: ",newRefreshToken)
            // If token is expired let validate with refresh token
            let userToken = jwt.verify(newRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    console.log("cookie1", err);
                    return;
                }
                let userToToken = {
                    username: user.username,
                    email: user.email
                }
                const accessToken = jwt.sign(userToToken, accessKey, { expiresIn: '600s' });
                return accessToken
            })
            //https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client#:~:text=The%20error%20%22Error%3A%20Can',body%20has%20already%20been%20written.
            if (!userToken) {
                return res.status(404).send("You are not authenticated!");
            }
            // pass new accessToken to req (optional)
            req.user = { username: userfromToken.username };

            next();
            return;
        }
        // pass user to req (optional)
        req.user = { username: user.username };
        
        next();
    })
}

module.exports = { authenticateToken } 