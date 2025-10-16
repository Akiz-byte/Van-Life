import React from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../api"

export default function Profile() {
  const [user, setUser] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar profile-avatar-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">Not signed in</p>
          </div>
        </div>
      </div>
    )
  }

  const initials = user.displayName 
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase()

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
          <h1 className="profile-title">{user.displayName || "Welcome"}</h1>
          <p className="profile-subtitle">Member since {new Date(parseInt(user.metadata.createdAt)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
        </div>

        <div className="profile-info">
          <div className="profile-info-item">
            <div className="profile-info-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Name</span>
            </div>
            <p className="profile-info-value">{user.displayName || "Not set"}</p>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email</span>
            </div>
            <p className="profile-info-value">{user.email}</p>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Account ID</span>
            </div>
            <p className="profile-info-value profile-uid">{user.uid}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="btn btn-logout"
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
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
