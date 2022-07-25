// importing packages
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// importing icons
import { Spin as HamburgerIcon } from 'hamburger-react';

// importing css
import '../styles/nav.css';

// customer nav bar component
function CustomerNav(props) {
    // creating user data
    const userData = JSON.parse(localStorage.getItem('userDetails')).user;

    // creating navigate
    const navigate = useNavigate();

    // creating state variables
    const [isOpen, setIsOpen] = useState(false);
    const [hamburgerMenuContainerStyle, setHamburgerMenuContainerStyle] =
        useState({
            visibility: 'hidden',
            opacity: 0,
        });
    const [hamburgerMenuStyle, setHamburgerMenuStyle] = useState({
        marginRight: '-100vw',
    });

    useEffect(() => {
        // hamburger menu toggle
        if (isOpen) {
            setHamburgerMenuContainerStyle({
                visibility: 'visible',
                opacity: 1,
            });
            setHamburgerMenuStyle({ marginRight: '0px' });
        } else {
            setHamburgerMenuContainerStyle({
                visibility: 'hidden',
                opacity: '0',
            });
            setHamburgerMenuStyle({ marginRight: '-100vw' });
        }
    }, [isOpen]);

    return (
        <>
            {/* hamburger menu */}
            <div
                onClick={(event) => {
                    if (event.target.className === 'hamburger-menu-container') {
                        setIsOpen(false);
                    }
                }}
                style={hamburgerMenuContainerStyle}
                className="hamburger-menu-container"
            >
                <div className="hamburger-menu" style={hamburgerMenuStyle}>
                    <ul>
                        <li
                            style={{
                                color: '#0061ff',
                                fontSize: '22px',
                                padding: '10px 30px',
                                marginBottom: '5px',
                                fontWeight: 'bold',
                            }}
                        >
                            Hello{' '}
                            <span
                                style={{
                                    textTransform: 'uppercase',
                                    color: '#000',
                                }}
                            >
                                {userData.username}
                            </span>
                        </li>

                        <li>
                            <Link
                                to="/customer/myorders"
                                style={{ color: 'inherit' }}
                            >
                                My Orders
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/customer/mycart"
                                style={{ color: 'inherit' }}
                            >
                                My Cart
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/all-food-items"
                                style={{ color: 'inherit' }}
                            >
                                All Food Items
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/all-restaurants"
                                style={{ color: 'inherit' }}
                            >
                                All Restaurants
                            </Link>
                        </li>

                        <li
                            onClick={() => {
                                localStorage.removeItem('userDetails');
                                navigate('/customer/login');
                            }}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            </div>

            {/* nav bar */}
            <nav className="nav" style={props.style}>
                {/* title */}
                <Link to="/home">
                    <h1 className="title">
                        Blue{' '}
                        <span style={{ color: '#fff', fontSize: '2.25vh' }}>
                            Plates
                        </span>
                    </h1>
                </Link>

                {/* hamburger icon */}
                <div className="hamburger-icon-container">
                    <HamburgerIcon
                        toggled={isOpen}
                        toggle={setIsOpen}
                        rounded
                        label="show menu"
                        hideOutline={false}
                        color="#fff"
                    />
                </div>

                {/* links */}
                <ul>
                    <li>
                        <Link style={{ color: '#fff' }} to="/customer/myorders">
                            My Orders
                        </Link>
                    </li>

                    <li>
                        {' '}
                        <Link style={{ color: '#fff' }} to="/customer/mycart">
                            My Cart
                        </Link>
                    </li>

                    <li>
                        Hello, <span>{userData?.username}</span>
                    </li>
                    <li
                        onClick={() => {
                            localStorage.removeItem('userDetails');
                            navigate('/customer/login');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        Logout
                    </li>
                </ul>
            </nav>
        </>
    );
}

function RestaurantNav() {
    // creating user data
    const userData = JSON.parse(localStorage.getItem('userDetails')).user;

    // creatin navigate
    const navigate = useNavigate();

    // creating state variables
    const [isOpen, setIsOpen] = useState(false);
    const [hamburgerMenuContainerStyle, setHamburgerMenuContainerStyle] =
        useState({
            visibility: 'hidden',
            opacity: 0,
        });
    const [hamburgerMenuStyle, setHamburgerMenuStyle] = useState({
        marginRight: '-100vw',
    });

    useEffect(() => {
        // hamburger menu toggle
        if (isOpen) {
            setHamburgerMenuContainerStyle({
                visibility: 'visible',
                opacity: 1,
            });
            setHamburgerMenuStyle({ marginRight: '0px' });
        } else {
            setHamburgerMenuContainerStyle({
                visibility: 'hidden',
                opacity: '0',
            });
            setHamburgerMenuStyle({ marginRight: '-100vw' });
        }
    }, [isOpen]);

    return (
        <>
            {/* hamburger menu  */}
            <div
                onClick={(event) => {
                    if (event.target.className === 'hamburger-menu-container') {
                        setIsOpen(false);
                    }
                }}
                style={hamburgerMenuContainerStyle}
                className="hamburger-menu-container"
            >
                <div className="hamburger-menu" style={hamburgerMenuStyle}>
                    <ul>
                        <li
                            style={{
                                color: '#0061ff',
                                fontSize: '22px',
                                padding: '10px 30px',
                                marginBottom: '5px',
                                fontWeight: 'bold',
                            }}
                        >
                            Hello{' '}
                            <span
                                style={{
                                    textTransform: 'uppercase',
                                    color: '#000',
                                }}
                            >
                                {userData.restaurantName}
                            </span>
                        </li>

                        <li>
                            <Link
                                to="/restaurant/orders"
                                style={{ color: 'inherit' }}
                            >
                                Orders
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/restaurant/food-items"
                                style={{ color: 'inherit' }}
                            >
                                My Food Items
                            </Link>
                        </li>

                        <li
                            onClick={() => {
                                localStorage.removeItem('userDetails');
                                navigate('/restaurant/login');
                            }}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            </div>

            {/* nav bar */}
            <nav className="nav restaurant-nav">
                {/* title */}
                <Link to="/home">
                    <h1 className="title">
                        Blue{' '}
                        <span style={{ color: '#fff', fontSize: '2.25vh' }}>
                            Plates
                        </span>
                    </h1>
                </Link>

                {/* hamburger icon */}
                <div className="hamburger-icon-container">
                    <HamburgerIcon
                        toggled={isOpen}
                        toggle={setIsOpen}
                        rounded
                        label="show menu"
                        hideOutline={false}
                        color="#fff"
                    />
                </div>

                {/* links */}
                <ul>
                    <Link style={{ color: '#fff' }} to="/restaurant/orders">
                        <li>Orders</li>
                    </Link>
                    <Link style={{ color: '#fff' }} to="/restaurant/food-items">
                        <li>My Food items</li>
                    </Link>
                    <li>
                        Hello, <span>{userData.restaurantName}</span>
                    </li>
                    <li
                        onClick={() => {
                            localStorage.removeItem('userDetails');
                            navigate('/restaurant/login');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        Logout
                    </li>
                </ul>
            </nav>
        </>
    );
}

export { CustomerNav, RestaurantNav };
