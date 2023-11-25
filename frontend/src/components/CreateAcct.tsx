
import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
interface AccountInfo {
    user: string,
    pass: string,
    lang: number
}

function CreateAcctComp () {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [lang, setLang] = useState(-1)
    async function onSubmit() {
        let response = await fetch("localhost:5000/register", {
             method: "POST",
             body: JSON.stringify({
                 username: user,
                 password: pass,
                 language: lang
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
    const onLanguageChange = (data: BaseSyntheticEvent) => {
        setLang(data?.target?.value)
    }
    return (
        <div className='text-start' onSubmit={() => onSubmit()}>
            <h5 className="card-title">Create your Newts account</h5>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control is-lgreen" id="floatingInput" placeholder="john.doe" onChange={onUsernameChange}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onPasswordChange}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <select className="form-select mb-3" aria-label="Default select example" onChange={onLanguageChange} defaultValue="0">
                    <option value="0" disabled={true}>Choose language</option>
                    <option value="1">English</option>
                    <option value="2">British</option>
                    <option value="3">Australian</option>
                </select>

            <button className='button' type="submit">Create Account</button>
        </div>
    )
}

export default CreateAcctComp;