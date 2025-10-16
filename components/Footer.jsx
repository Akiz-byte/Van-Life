import React from "react"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-section">
                    <h3 className="footer-brand">VanLife</h3>
                    <p className="footer-tagline">Adventure awaits. Rent the perfect van for your perfect road trip.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="footer-social">
                        <a href="https://wa.me/919307715466?text=Hi%20there%20I'm%20interested%20in%20renting%20a%20van" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/mi.aki96/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://x.com/Akiz96" target="_blank" rel="noopener noreferrer" aria-label="X">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&#169; {currentYear} VanLife. All rights reserved. | Made with ❤️ for adventurers</p>
            </div>
        </footer>
    )
}