import React from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { logoutUser, getRandomQuote } from "../api"

export default function Profile() {
  const [user, setUser] = React.useState(undefined)
  const navigate = useNavigate()

  React.useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])

  if (user == null) return null

  const initials = user.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : (user.email?.[0] || '?').toUpperCase()

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <span className="profile-initials">{initials}</span>
            )}
          </div>
          <span className="profile-badge">Member since {new Date(parseInt(user.metadata?.createdAt || Date.now())).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <div className="info-item-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Display Name</span>
            </div>
            <p className="info-item-value">{user.displayName || "Not set"}</p>
          </div>

          <div className="info-item">
            <div className="info-item-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email Address</span>
            </div>
            <p className="info-item-value">{user.email}</p>
          </div>

          <div className="info-item">
            <div className="info-item-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Account ID</span>
            </div>
            <p className="info-item-value info-uid">{user.uid}</p>
            <RandomQuote />
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="btn-logout"
            onClick={async () => {
              await logoutUser()
              navigate("/", { replace: true })
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

function RandomQuote() {
  const [quote, setQuote] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const q = await getRandomQuote()
        if (mounted) setQuote(q)
      } catch (e) {
      }
    })()
    return () => { mounted = false }
  }, [])

  if (!quote) return null
  return (
    <div className="profile-quote" aria-live="polite">
      <p className="quote-text">“{quote.text}”</p>
      {quote.author ? <span className="quote-author">— {quote.author}</span> : null}
    </div>
  )
}
