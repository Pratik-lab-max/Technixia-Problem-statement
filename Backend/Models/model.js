const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({

    fname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true,
        minlength : 8
    },
    cpassword : {
        type : String,
        require : true,
        minlength : 8
    }

})

mongoose.model("USER", userSchema)
// const USER = new mongoose.model("user" , userSchema)

// module.exports = USER