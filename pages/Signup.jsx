import React from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { signupUser } from "../api"

export default function Signup() {
  const [form, setForm] = React.useState({ fullName: "", email: "", password: "" })
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/profile"

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
  navigate(from || "/profile", { replace: true })
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
          <h1>Create your account</h1>
          <p>Join VanLife and start your adventure</p>
        </div>

        {error?.message && (
          <div className="auth-alert auth-alert-error">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
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
            className="btn-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" state={{ from }} className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
