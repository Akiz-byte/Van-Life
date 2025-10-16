import React from "react"
import { Link } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getHostVans } from "../../api"
import { HostVansSkeleton } from "../../components/SkeletonLoader"

export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [authReady, setAuthReady] = React.useState(false)

    React.useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthReady(true)
        })
        return () => unsubscribe()
    }, [])

    React.useEffect(() => {
        if (!authReady) return

        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [authReady])

    const hostVansEls = vans.map(van => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <HostVansSkeleton />
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {hostVansEls}
                        </section>
                    ) : (
                        <h2>No vans listed yet.</h2>
                    )
                }
            </div>
        </section>
    )
}