import { BaseSyntheticEvent, useState } from "react";
import { SyntheticEventData } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";
import { postData } from "../helper";

interface AccountInfo {
    user: string,
    pass: string,
}

function SignInComp () {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const onSubmit = () => {
        postData("http://127.0.0.1:5000/login", {
                 username: user,
                 password: pass,
        }).then((res: any) => {
            console.log(res)
            localStorage.setItem('id', res.id);
            navigate('/app', { replace: true });
        });
     }

    const onUsernameChange = (data: BaseSyntheticEvent) => {
        setUser(data?.target?.value )
    }
    const onPasswordChange = (data: BaseSyntheticEvent) => {
        setPass(data?.target?.value )
    }
    return (
        <div className='text-start' onSubmit={() => {onSubmit()}}>
            <h5 className="card-title">Sign in with your Newts account</h5>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control is-lgreen" id="username" placeholder="john.doe" onChange={onUsernameChange} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={onPasswordChange} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            <button className='button btn-dark' type="button" onClick={onSubmit}>Sign In</button>
        </div>
    )
}
export default SignInComp