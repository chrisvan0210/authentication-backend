import db from '../../../models/index'

let GetUsers = async (body) =>{
    if(body){
        try{
            const res = await db.Users.findAll({
                where: {username: body.username},
                attributes: ['username', 'email']
              })
            return res
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = GetUsers