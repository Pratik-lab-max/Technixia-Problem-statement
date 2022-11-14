import React, { useState } from 'react'
import './Signin.css'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signin = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        
        fetch("http://localhost:3512/signin" , {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                notifyA(data.error)
            }else{
                notifyB("Login Successfully")
                navigate("/")
            }
        })
    }

  return (
    <div className="signIn">
        <div className="container">
            <div className="form1">
                <h1>Log in</h1>
                <div className="f-data">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} placeholder="xyz@gmail.com" onChange={(e) => {setEmail(e.target.value)}} />
                </div>
                <div className="f-data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} placeholder="min 8 character"  onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <button className="btn1" onClick={() => {postData()}} >Log in</button>
                <div className='form1'>
                    Don't have an account ? 
                    <Link to="/signup"><span style={{color:"blue" , cursor:"pointer"}}>Register</span></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin
