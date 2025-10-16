import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import PageTransition from "./PageTransition"

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </main>
            <Footer />
        </div>
    )
}