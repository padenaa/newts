function SignInComp () {
    return (
        <div className='text-start'>
            <h5 className="card-title">Sign in with your Newts account</h5>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control is-lgreen" id="floatingInput" placeholder="john.doe" />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            <button className='button'>Sign In</button>
        </div>
    )
}
export default SignInComp