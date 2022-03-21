import db from '../../../models/index'
// const db = require('../../models/index')

let DeleteUser = async (body) =>{
    if(body){
        try{
            const deleteUser = await db.Users.findOne({
                where : {username:body.username},
                attributes: ['username']
              })
           
            if(!deleteUser){
                throw new Error("users not found!")
            }
            console.log("deleteUser: ",deleteUser)
            await db.Users.destroy({
                where : {username:body.username},
            });
            return {message : "Deleted Successfully!"}
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = DeleteUser