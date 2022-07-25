// importing packages
import { useState } from 'react';
import { Link } from 'react-router-dom';

// importing icons
import { MdMail, MdPhone, MdHome } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

// importing css
import '../styles/footer.css';

// footer component
function Footer() {
    // creating state variables
    const [currentQuickLink] = useState({
        marginLeft: '5px',
        color: '#0061ff',
    });
    const [currentURL] = useState(window.location.href);

    return (
        <section className="footer-container">
            {/* footer */}

            <footer className="footer">
                {/* title */}
                <div className="title-container footer-child">
                    <Link to="/home">
                        <h1 className="title">
                            Blue <span>Plates</span>
                        </h1>
                    </Link>
                </div>
                {/* quick links */}
                <div className="footer-child quick-links-contianer">
                    <h1
                        className="quick-links-title"
                        style={{
                            color: '#0061ff',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Quick Links
                    </h1>
                    <ul className="quick-links">
                        {currentURL.split('/')[4] === 'myorders' ? (
                            <li style={currentQuickLink}>My Orders</li>
                        ) : (
                            <li>
                                <Link
                                    to="/customer/myorders"
                                    style={{ color: 'inherit' }}
                                >
                                    My Orders
                                </Link>
                            </li>
                        )}

                        {currentURL.split('/')[4] === 'mycart' ? (
                            <li style={currentQuickLink}>My Cart</li>
                        ) : (
                            <li>
                                <Link
                                    to="/customer/mycart"
                                    style={{ color: 'inherit' }}
                                >
                                    My Cart
                                </Link>
                            </li>
                        )}

                        {currentURL.split('/')[3] === 'all-food-items' ? (
                            <li style={currentQuickLink}>All Food Items</li>
                        ) : (
                            <li>
                                <Link
                                    to="/all-food-items"
                                    style={{ color: 'inherit' }}
                                >
                                    All Food Items
                                </Link>
                            </li>
                        )}

                        {currentURL.split('/')[3] === 'all-restaurants' ? (
                            <li style={currentQuickLink}>All Restaurants</li>
                        ) : (
                            <li>
                                <Link
                                    to="/all-restaurants"
                                    style={{ color: 'inherit' }}
                                >
                                    All Restaurants
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* contact us */}
                <div className="footer-child contact-us">
                    <h1
                        style={{
                            color: '#0061ff',
                            letterSpacing: '.5px',
                            textTransform: 'uppercase',
                        }}
                    >
                        CONTACT
                    </h1>
                    <div className="contact-details">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                style={{
                                    marginRight: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MdMail />
                            </i>
                            <p style={{ cursor: 'pointer' }}>
                                Jithendrabathala@gmail.com
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                style={{
                                    marginRight: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MdPhone />
                            </i>
                            <p style={{ cursor: 'pointer' }}>+91 9052046768</p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                style={{
                                    marginRight: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MdHome />
                            </i>
                            <p style={{ cursor: 'pointer' }}>
                                Bangalore, 560096, India
                            </p>
                        </div>
                    </div>
                </div>

                {/* social media links */}
                <div
                    className="footer-child social-links"
                    style={{ alignSelf: 'flex-start' }}
                >
                    <h1
                        style={{
                            color: '#0061ff',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Fallow Us
                    </h1>
                    <div className="social-icons">
                        <button className="social-icon">
                            <FaFacebook />
                        </button>
                        <button className="social-icon">
                            <FaInstagram />
                        </button>
                        <button className="social-icon">
                            <FaYoutube />
                        </button>
                        <button className="social-icon">
                            <FaTwitter />
                        </button>
                        {/* <button className="social-icon">
                            <FaLinkedin />
                        </button> */}
                    </div>
                </div>
            </footer>

            {/* copyright  */}
            <div
                style={{
                    background: '#000',
                    textAlign: 'center',
                    color: 'lightgray',
                    paddingBottom: '10px',
                    userSelect: 'none',
                }}
                className="copyright-container"
            >
                <p
                    className="copyright-text"
                    style={{ fontSize: '12px', marginBottom: '2px' }}
                >
                    Copyright &#169; 2022 BluePlates, Inc. All rights reserved.
                </p>
                <p
                    className="my-profile-link-container"
                    style={{ fontSize: '10px' }}
                >
                    Created By{' '}
                    <a
                        href="https://www.linkedin.com/in/jithendra-bathala-832a26150/"
                        target="_blank"
                        className="my-profile-link"
                        rel="noreferrer"
                    >
                        Jithendra
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Footer;
