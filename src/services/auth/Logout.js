import db from '../../../models/index'
var cookie = require('cookie');




let Logout = async (req, res) => {
    try {
    //    return res.cookie('auth','', {
    //         maxAge: 0,
    //         httpOnly: true
    //     });
    res.clearCookie('auth');
    // res.redirect('/');
        //   req.headers.cookie.destroy(function (err) {
        //     res.redirect('/');
        //   });
    } catch (err) {
        console.log(err)
    }
}

module.exports = Logout