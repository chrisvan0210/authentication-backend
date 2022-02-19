import CreateUser from '../services/CreateUser'


// For View 
const usersView = (req, res) => {

    res.render("users.ejs", {
    } );
}

let addUser = async(req,res)=>{
    if(req.body){
        try{
            const userInfo =  await CreateUser(req.body)
             return res.status(200).json({userInfo:userInfo})
         }
         catch(err){
             console.log(err);
             return res.status(503)
         }
    }
    return res.status(300).json("body is empty!")
    
}


module.exports =  {
    usersView,
    addUser
};