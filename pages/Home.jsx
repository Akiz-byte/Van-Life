import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section className="home-container">
            <div className="home-inner">
                <h1 className="home-title">
                    <span className="home-title-mobile">
                        You got the<br />travel plans,<br />we got the<br />travel <span className="home-accent">vans</span>.
                    </span>
                    <span className="home-title-desktop">
                        You got the travel plans, we got the travel <span className="home-accent">vans</span>.
                    </span>
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