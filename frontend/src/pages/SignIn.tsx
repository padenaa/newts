import React, { useState } from 'react';
import logo from "../assets/newts logo.png"

function SignInComp () {
    return (
        <div style={{marginTop: "20px"}}>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
        </div>
    )
}

function CreateAcctComp () {
    return (
        <div>

        </div>
    )
}

function SignIn () {
    const [newUser, setNewUser] = useState(false);
    return (
        <div>
            <img src={logo} style={{height:"200px"}}/>
            {!newUser && <SignInComp />}
            {newUser && <CreateAcctComp />}
            
        </div>
    )
}
export default SignIn;