
interface AccountInfo {
    user: string,
    pass: string,
    lang: number
}

function CreateAcctComp () {
    function onSubmit(data: AccountInfo) {
       let response = fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            body: JSON.stringify({
                username: data.user,
                password: data.pass,
                language: data.lang
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    return (
        <div className='text-start'>
            <h5 className="card-title">Create your Newts account</h5>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control is-lgreen" id="floatingInput" placeholder="john.doe" />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="dropdown mb-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Language
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">English</a></li>
                        <li><a className="dropdown-item" href="#">British</a></li>
                        <li><a className="dropdown-item" href="#">Australian</a></li>
                    </ul>
                </div>
            <button className='button'>Create Account</button>
        </div>
    )
}

export default CreateAcctComp;