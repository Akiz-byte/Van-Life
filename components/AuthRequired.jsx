import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function AuthRequired() {
    const location = useLocation()
    const [authChecked, setAuthChecked] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    React.useEffect(() => {
        const auth = getAuth()
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user)
            setAuthChecked(true)
        })
        return () => unsub()
    }, [])

    if (!authChecked) return null // or a loader

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/login"
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }}
                replace
            />
        )
    }
    return <Outlet />
}