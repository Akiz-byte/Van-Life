import React from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { signupUser } from "../api"

export default function Signup() {
  const [form, setForm] = React.useState({ fullName: "", email: "", password: "" })
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/host"

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.password) {
      setError({ message: "Full name, email and password are required" })
      return
    }
    const emailOk = /^\S+@\S+\.[\S]+$/.test(form.email)
    if (!emailOk) {
      setError({ message: "Please enter a valid email address" })
      return
    }
    if (form.password.length < 6) {
      setError({ message: "Password must be at least 6 characters" })
      return
    }
    setStatus("submitting")
    try {
      await signupUser(form)
      navigate("/profile", { replace: true })
    } catch (err) {
      setError(err)
    } finally {
      setStatus("idle")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your van life adventure today</p>
        </div>

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
            <label htmlFor="fullName" className="form-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

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
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
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
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
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
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-helper">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
