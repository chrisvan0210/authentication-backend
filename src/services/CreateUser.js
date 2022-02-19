import db from '../../models/index'
// const db = require('../../models/index')

let CreateUsers = async (body) =>{
    if(body){
        try{
            const res = await db.Users.create({
                username : body.username,
                password : body.password
            })
            return res
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = CreateUsers