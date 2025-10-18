import React from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from || "/profile";

    function validate() {
        const { email, password } = loginFormData
        if (!email || !password) return "Email and password are required"
        const emailOk = /^\S+@\S+\.[\S]+$/.test(email)
        if (!emailOk) return "Please enter a valid email address"
        return null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const validationError = validate()
        if (validationError) {
            setError({ message: validationError })
            return
        }
        setStatus("submitting")
        try {
            await loginUser(loginFormData)
            setError(null)
            // Navigate back to the page they came from, or to profile
            navigate(from, { replace: true })
        } catch (err) {
            setError(err)
        } finally {
            setStatus("idle")
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome back</h1>
                    <p>Sign in to your account to continue</p>
                </div>

                {location.state?.message && (
                    <div className="auth-alert auth-alert-warning">
                        {location.state.message}
                    </div>
                )}

                {error?.message && (
                    <div className="auth-alert auth-alert-error">
                        {error.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="your@email.com"
                            value={loginFormData.email}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your password"
                            value={loginFormData.password}
                            className="form-input"
                        />
                    </div>

                    <button
                        className="btn-submit"
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/signup" state={{ from }} className="auth-link">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}