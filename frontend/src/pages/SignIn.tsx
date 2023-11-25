import React, { useState } from 'react';
import logo from "../assets/newts logo.png"
import CreateAcctComp from "../components/CreateAcct"
import SignInComp from '../components/SignInComp';

function SignIn () {
    const [newUser, setNewUser] = useState(false);

    return (

        <div className="card" style={{width: "30rem", height: "40rem", backgroundColor: "#F8FDF0"}}>
            <div className="card-body">
                <img src={logo} style={{height:"200px"}}/>

                {!newUser && <SignInComp/>}
                {newUser && <CreateAcctComp/>}

                {!newUser && <p className="card-text text-start mt-3">Don't have an account? <a className="card-link" onClick={() => {setNewUser(true)}}>Create Account</a></p>}
                {newUser && <p className="card-text text-start mt-3">Have an account? <a className="card-link" onClick={() => {setNewUser(false)}}>Sign In</a></p>}
                
            </div>
        </div>
            

    )
}
export default SignIn;