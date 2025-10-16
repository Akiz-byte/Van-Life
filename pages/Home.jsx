import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section className="home-container">
            <div className="home-inner">
                <h1>
                    You got the travel plans,
                    we got the travel <span className="home-accent">vans</span>.
                </h1>
                <p className="home-subtitle">
                    Add adventure to your life by joining the #vanlife movement.
                    Rent the perfect van to make your perfect road trip.
                </p>
                <div className="home-cta">
                    <Link to="vans" className="btn btn-primary">Find your van</Link>
                    <Link to="about" className="btn btn-secondary">Learn more</Link>
                </div>
            </div>
        </section>
    )
};