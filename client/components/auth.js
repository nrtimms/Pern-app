import { useState } from 'react'

const Auth = () => {
    const [isLogIn, setIsLogIn] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const viewLogIn = (status) => {
        setError(null)
        setIsLogIn(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError("Make sure passwords match.")
            return
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})

        })
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{ isLogIn ? 'Please Log In' : 'Please Sign Up' }</h2>
                    <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    {!isLogIn && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />}
                    <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")} />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button onClick={() => viewLogIn(false)}>Sign Up</button>
                    <button onClick={() => viewLogIn(true)}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Auth