var jwt = require('jsonwebtoken');
const accessKey = process.env.TOKEN_SECRET;
const refreshKey = process.env.REFRESH_TOKEN_SECRET;


const jwtSignToken = (payload)=>{
    return jwt.sign(payload, accessKey, { expiresIn: '15s' });
}

const jwtSignRefreshToken = (payload)=>{
    return jwt.sign(payload, refreshKey, { expiresIn: '600s' });
}

export {
    jwtSignToken,
    jwtSignRefreshToken
}