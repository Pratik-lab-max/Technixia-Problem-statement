const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')

router.post("/signup" , (req,res) => {
    
   const {fname,email,password,cpassword} = req.body

   if (!fname || !email || !password || !cpassword) {
        res.status(422).json({error : "fill all the details"})
   }
   USER.findOne({email:email})
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({error : "User already exists"})
            }
            bcrypt.hash(password, 12).then((hashedPassword) => {

                const user = new USER ({
                    fname,
                    email,
                    password : hashedPassword,
                    cpassword : hashedPassword
                })
                user.save()
                    .then(user => { res.json({ message: "Registration Successful"}) })
                    .catch(err => { console.log(err) })
            })
        })

})

router.post("/signin" , (req,res) => {

    const {email,password} = req.body 

    if (!email || !password) {
        return res.status(422).json({error : "email or password could not be blank"})
    }

    USER.findOne({ email:email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({error : "Invalid email"})
            }
            bcrypt.compare(password,savedUser.password).then((match) => {
                if(match) {
                    res.status(200).json({message : "Login successfully"})
                }else {
                    return res.status(422).json({error : "Incorrect Password"})
                }
            })
                .catch(err => console.log(err))
        })
})



module.exports = router