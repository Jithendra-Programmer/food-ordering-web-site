// importing packages
import React from 'react';
import { Link } from 'react-router-dom';

// importing css
import './styles/landing.css';

// LandingPage Component
function LandingPage() {
    return (
        <div className="main">
            <div className="landing">
                {/* landing page nav bar */}
                <nav className="landing-nav">
                    <h1 className="title">
                        Blue{' '}
                        <span style={{ fontSize: '25px', color: '#fff' }}>
                            Plates
                        </span>
                    </h1>
                </nav>

                <div className="container">
                    {/* customer auth */}
                    <div className="customer-container">
                        <div className="background">
                            <h1 style={{ color: '#fff' }}>
                                Fill Your Plates With Blue Plates
                            </h1>
                            <p style={{ color: 'lightgray', fontSize: '14px' }}>
                                Customer account Login
                            </p>
                            <Link to="/customer/login">
                                <button className="btn">
                                    Fill your plates
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* restaurant auth */}
                    <div className="restaurant-container">
                        <div className="background">
                            <h1 style={{ color: '#fff' }}>
                                Feed The Plates With Blue Plates
                            </h1>
                            <p style={{ color: 'lightgray', fontSize: '14px' }}>
                                Business account Login
                            </p>
                            <Link to="/restaurant/login">
                                <button className="btn">Feed The plates</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
