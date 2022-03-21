import createNews from '../services/post/CreateNews'


// For Create News
let addNews = async (req, res) => {
    if (req.body) {
        // console.log("file", req.files);
        if(req.files !== null){
            req.body = {...req.body,...req.user,...req.files.file.name};
        }else{
            req.body = {...req.body,...req.user};
        }
       
        try {
            const resPost = await createNews(req, res)
            if (resPost) {
                return res.status(200).json({Post:resPost})
            }
           return res
        }
        catch (err) {
            console.log(err);
            return res.status(503)
        }
    }
    else {
        return res.status(300).json("body is empty!")
    }
}


module.exports = {
    addNews
}