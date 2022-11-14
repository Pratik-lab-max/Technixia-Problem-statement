/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import './Signup.css'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {

    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const notifyA = (msg) => toast.error((msg) ,{position : "top-center"})
    const notifyB = (msg) => toast.success((msg) ,{position : "top-center"})

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/


    const postData=() => {

        if (!emailRegex.test(email)) {
            notifyA("Invalid Email")
            return
        }else if (!passRegex.test(password)) {
            notifyA("Password must contain at least 8 characters, including atleast 1 number and includes both lower and uppercase letters and special characters for example #,?,!,$,@,%,^,&,*")
            return
        }

        fetch("http://localhost:3512/signup", {
            method:"post",
            headers : {
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                fname:fname,
                email:email,
                password:password,
                cpassword:cpassword
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate("/signin")
            }
        })
    }

  return (
    <div className="signUp">
        <div className="container">
            <div className="form">
                <h1>Create your account here</h1>
                <div className="f-data">
                    <label htmlFor="fname">Full Name</label>
                    <input type="text" name="fname" id="fname" value={fname} placeholder="full name" onChange={(e) => {setFname(e.target.value)}} />
                </div>

                <div className="f-data">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} placeholder="xyz@gmail.com" onChange={(e) => {setEmail(e.target.value)}} />
                </div>

                <div className="f-data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} placeholder="min 8 character" onChange={(e) => {setPassword(e.target.value)}} />
                </div>

                <div className="f-data">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" id="cpassword"  value={cpassword} placeholder="min 8 character" onChange={(e) => {setCpassword(e.target.value)}} />
                </div>
                <button className="btn" onClick={() => {postData()}}>Register</button>
                <div className='form1'>
                    Already have an account ? 
                    <Link to="/signin"><span style={{color:"blue" , cursor:"pointer"}}>Log in</span></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
