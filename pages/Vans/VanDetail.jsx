import React from "react"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getVan, rentVan } from "../../api"
import { VanDetailSkeleton } from "../../components/SkeletonLoader"

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [renting, setRenting] = React.useState(false)
    const [isRented, setIsRented] = React.useState(false)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user)
        })
        return () => unsubscribe()
    }, [])

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])

    async function handleRentVan() {
        if (!isAuthenticated) {
            // Redirect to login with state to return here
            navigate("/login", { 
                state: { 
                    message: "You must log in first to rent a van",
                    from: location.pathname 
                } 
            })
            return
        }

        setRenting(true)
        try {
            await rentVan(id)
            setIsRented(true)
        } catch (err) {
            alert("Error renting van: " + err.message)
        } finally {
            setRenting(false)
        }
    }
    
    if (loading) {
        return <VanDetailSkeleton />
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || "";
    const type = location.state?.type || "all";
    
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
            {van && (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    
                    {isRented ? (
                        <div className="rental-success">
                            <button className="btn-rented" disabled>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Added to Your Vans
                            </button>
                            <p className="rental-message">
                                Check your <Link to="/host/vans" className="rental-link">Host Dashboard</Link> to manage this van
                            </p>
                        </div>
                    ) : (
                        <button 
                            className="link-button" 
                            onClick={handleRentVan}
                            disabled={renting}
                        >
                            {renting ? (
                                <>
                                    <span className="btn-spinner-inline"></span>
                                    Adding...
                                </>
                            ) : (
                                "Rent this van"
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}