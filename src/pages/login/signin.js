import React, { useState } from "react";
import './Signin.css'
import axiso from 'axios';
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isResetRequested, setIsResetRequested] = useState(false)
const navigate = useNavigate();
    const handleSignIn = async (e) => {
        e.preventDefault();
        const formData = {
            email : email,
            password : password,
        }
        try {
            console.log('email, password',email,password,)
            
           await axiso.post('http://localhost:3000/Tokens',
            formData
            ).then((response) => {
                console.log('response',response)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("name",response.data.data.name)
                localStorage.setItem("userId", String(response.data.data.userId));

                //console.log("name",response.data.data.name)
                console.log(response.data.data.userId)
                
                if(response.status === 200) {
                    // navigate('/Home')
                   navigate('/')
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
            // console.log('Sign-in sucessfully:', response)
          
        }
        catch (error) {
            console.log('Sign-in error:', error)

        }

    }
    const handleForgotPasssword = async () => {
        try {
            await axiso.post("http://localhost:3000/forgotpassword", {
                email,
            })
            setIsResetRequested(true)
            console.log("Password reset sucessfully")
        } catch (error) {
            console.log("Error for reset the password")

        }

    }


    return (
        <div className="signin-background">
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={(e) => handleSignIn(e)} >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                < button >Sign In</button>
            </form>

            {isResetRequested ? (
               
                <p>
                    An email with instructions to reset your password has been sent to your inbox.

                </p>
            ) : (
                <div className="forgot-password-container">

                    <Link className="forgotbtn" onClick={handleForgotPasssword}>Forgot Password</Link>

                    <p>Don't have an account <Link style={{textDecoration:"none" }} to='/signup'> <span style={{ color: "black"}}>Sign up</span> </Link></p>
                </div>
            )}
        </div>
        </div>
    )
}

export default SignIn