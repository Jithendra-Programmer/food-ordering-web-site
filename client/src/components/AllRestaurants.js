// importing packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// importing componenets
import { CustomerNav } from './layouts/Nav';
import Footer from './layouts/Footer';

// importing css
import './styles/customerDashboard.css';

// importing baseURL
import { baseURL } from '../App';

// Component to display all restaurants
function AllRestaurants() {
    // creating state variables
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // fetch all the restaurants
        fetch(`${baseURL}/restaurant/get`)
            .then((res) => res.json())
            .then((data) => setRestaurants(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="customer-dashboard">
            {/* nav bar */}
            <CustomerNav style={{ background: 'rgba(0, 0, 0, 1)' }} />

            {/* banner */}
            <section className="customer-banner"></section>

            {/* all restaurants */}
            <section className="restaurants-container container">
                <h1 className="title">Restaurants</h1>

                <div className="restaurants">
                    {restaurants.length === 0 ? (
                        <div className="leading">
                            <h1>Loading...</h1>
                        </div>
                    ) : (
                        restaurants.map((restaurant, key) => (
                            <div className="restaurant-card" key={key}>
                                <img
                                    alt="restaurant-img"
                                    className="restaurant-card-img"
                                    src={`${baseURL}/restaurant/image/${restaurant.pic}`}
                                />
                                <div className="restaurant-card-details">
                                    <h1>{restaurant.restaurantName}</h1>
                                    <p style={{ fontFamily: 'monospace' }}>
                                        {restaurant.address}
                                    </p>
                                    <div
                                        className="timings-container"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div style={{ width: '50%' }}>
                                            <h5>Opening Time:</h5>
                                            <p>{restaurant.openingTime}</p>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <h5>Closing Time:</h5>
                                            <p>{restaurant.closingTime}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/customer/restaurant/${restaurant._id}`}
                                        state={{ restaurant }}
                                    >
                                        <button
                                            style={{
                                                width: '100%',
                                                marginTop: '10px',
                                            }}
                                            className="btn"
                                        >
                                            View More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AllRestaurants;
