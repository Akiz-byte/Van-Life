import React from "react"
import { Link, NavLink } from "react-router-dom"
import avatarUrl from "/assets/images/avatar-icon.png"
import logoUrl from "/assets/images/vanlife-logo.png"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function Header() {
    const [user, setUser] = React.useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const auth = getAuth()
        const unsub = onAuthStateChanged(auth, setUser)
        return () => unsub()
    }, [])

    function toggleMobileMenu() {
        setMobileMenuOpen(prev => !prev)
    }

    function closeMobileMenu() {
        setMobileMenuOpen(false)
    }

    function getUserLabel(u) {
        if (!u) return ""
        const name = (u.displayName || "").trim()
        if (name) {
            const first = name.split(" ")[0]
            return first
        }
        const email = (u.email || "").trim()
        if (email && email.includes("@")) {
            return email.split("@")[0]
        }
        return email || "Profile"
    }

    return (
        <header>
            <div className="header-inner">
                <Link className="site-logo" to="/" onClick={closeMobileMenu}>
                    <span className="site-logo-text">VanLife</span>
                    <img src={logoUrl} alt="VanLife" className="site-logo-mark" />
                </Link>

                <button 
                    className="hamburger-btn" 
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
                    <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
                    <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
                </button>

                <nav className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
                    <NavLink
                        to="/host"
                        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                        onClick={closeMobileMenu}
                    >
                        Host
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                        onClick={closeMobileMenu}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/vans"
                        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                        onClick={closeMobileMenu}
                    >
                        Vans
                    </NavLink>
                    <Link 
                        to={user ? "/profile" : "/login"} 
                        className="login-link" 
                        title={user ? "Profile" : "Login"}
                        onClick={closeMobileMenu}
                    >
                        <img src={avatarUrl} className="login-icon" alt="Account" />
                        {user ? (
                            <span className="user-name" title={user.displayName || user.email}>
                                {getUserLabel(user)}
                            </span>
                        ) : (
                            <span className="login-text">Login</span>
                        )}
                    </Link>
                </nav>
            </div>

            {mobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
        </header>
    )
}