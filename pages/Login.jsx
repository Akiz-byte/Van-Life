import React from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from || "/host";

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
                    <div className="auth-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                    </div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to continue your adventure</p>
                </div>

                {location.state?.message && (
                    <div className="auth-alert auth-alert-warning">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {location.state.message}
                    </div>
                )}

                {error?.message && (
                    <div className="auth-alert auth-alert-error">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        {error.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            value={loginFormData.email}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            Password
                        </label>
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
                        className="auth-submit-btn"
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? (
                            <>
                                <span className="btn-spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            "Log in"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-helper">
                        Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}