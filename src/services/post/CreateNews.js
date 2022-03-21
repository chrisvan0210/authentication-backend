import db from '../../../models/index'

let createNews = async (req,res) =>{
    if(req.body){
        try{
            const res = await db.News.create(req.body)
            return res
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = createNews