import { BaseSyntheticEvent, useState } from "react";
import { SyntheticEventData } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

interface AccountInfo {
    user: string,
    pass: string,
}

function SignInComp () {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    async function onSubmit() {
        let response = await fetch("localhost:5000/login", {
             method: "POST",
             body: JSON.stringify({
                 username: user,
                 password: pass,
             }),
             headers: {
                 "Content-type": "application/json; charset=UTF-8"
             }
         });
        let resJson = await response.json();
        localStorage.setItem('id',resJson?.id);
        navigate('/app', { replace: true });
     }

    const onUsernameChange = (data: BaseSyntheticEvent) => {
        setUser(data?.target?.value )
    }
    const onPasswordChange = (data: BaseSyntheticEvent) => {
        setPass(data?.target?.value )
    }
    return (
        <form className='text-start' onSubmit={() => {onSubmit()}}>
            <h5 className="card-title">Sign in with your Newts account</h5>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control is-lgreen" id="username" placeholder="john.doe" onChange={onUsernameChange} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={onPasswordChange} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            <button className='button' type="submit">Sign In</button>
        </form>
    )
}
export default SignInComp