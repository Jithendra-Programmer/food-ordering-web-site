// importing packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// importing icons
import { FiShoppingCart } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { MdOutlineDeliveryDining } from 'react-icons/md';

// importing components
import { CustomerNav } from './layouts/Nav';
import './styles/customerDashboard.css';
import Footer from './layouts/Footer';

// importing baseURL
import { baseURL } from '../App';

// CustomerDashboard component
function CustomerDashboard() {
    // creating state variables
    const [navStyle] = useState({
        background: 'rgba(0, 0, 0, 1)',
    });
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [topFoodItems, setTopFoodItems] = useState([]);

    useEffect(() => {
        // fetch top restaurants and food items
        fetch(`${baseURL}/restaurant/get`)
            .then((res) => res.json())
            .then((data) => setTopRestaurants(data.splice(0, 3)))
            .catch((err) => console.log(err));
        fetch(`${baseURL}/food/getItems`)
            .then((res) => res.json())
            .then((data) => setTopFoodItems(data.splice(0, 3)))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="customer-dashboard">
            {/* nav bar */}
            <CustomerNav style={navStyle} />

            {/* banner */}
            <section className="customer-banner"></section>

            {/* section 2 */}
            <section className="container section-2">
                <div className="card">
                    <FiShoppingCart style={{ fontSize: '60px' }} />
                    <h1>No Minimum Order</h1>
                    <p>
                        Order in for yourself or for the group, with no
                        restrictions on order value
                    </p>
                </div>
                <div className="card">
                    <GoLocation
                        style={{
                            fontSize: '60px',
                            color: 'white',
                        }}
                        color="#fff"
                    />
                    <h1>Live Order Tracking</h1>
                    <p>
                        Know where your order is at all times, from the
                        restaurant to your doorstep
                    </p>
                </div>
                <div className="card">
                    <MdOutlineDeliveryDining
                        style={{
                            fontSize: '60px',
                            color: 'white',
                        }}
                        color="#fff"
                    />
                    <h1>Live Order Tracking</h1>
                    <p>
                        Know where your order is at all times, from the
                        restaurant to your doorstep
                    </p>
                </div>
            </section>

            {/* top restaurants */}
            <section className="top-restaurant-container container">
                <div className="title-container">
                    <h1 className="title">Top Restaurants</h1>
                    <Link to="/all-restaurants">
                        <h4 style={{ cursor: 'pointer', color: '#0061ff' }}>
                            View more
                        </h4>
                    </Link>
                </div>

                <div className="top-restaurants">
                    {topRestaurants.length === 0 ? (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>
                    ) : (
                        topRestaurants.map((topRestaurant, key) => (
                            <div className="restaurant-card" key={key}>
                                <img
                                    alt="Restaurant pic"
                                    src={`${baseURL}/restaurant/image/${topRestaurant.pic}`}
                                    className="restaurant-card-img"
                                />
                                <div className="restaurant-card-details">
                                    <h1>{topRestaurant.restaurantName}</h1>
                                    <p style={{ fontFamily: 'monospace' }}>
                                        {topRestaurant.address}
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
                                            <p>{topRestaurant.openingTime}</p>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <h5>Closing Time:</h5>
                                            <p>{topRestaurant.closingTime}</p>
                                        </div>
                                    </div>
                                    <Link to="/all-restaurants">
                                        <button
                                            style={{
                                                width: '40%',
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

            {/* top food items */}
            <section className="top-food-items-container container">
                <div className="title-container">
                    <h1 className="title">Top Food Items</h1>
                    <Link to="/all-food-items">
                        <h4 style={{ cursor: 'pointer', color: '#fff' }}>
                            View more
                        </h4>
                    </Link>
                </div>
                <div className="top-food-items">
                    {topFoodItems.length === 0 ? (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>
                    ) : (
                        topFoodItems.map((topFoodItem, key) => (
                            <div className="food-item-card" key={key}>
                                <img
                                    alt="food item pic"
                                    src={`${baseURL}/food/image/${topFoodItem.pic}`}
                                    className="food-item-card-img"
                                />
                                <div className="food-item-card-details">
                                    <h1>{topFoodItem.name}</h1>
                                    <p style={{ fontFamily: 'monospace' }}>
                                        {topFoodItem.description}
                                    </p>
                                    <div
                                        className="price-quantity-container"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div style={{ width: '50%' }}>
                                            <h5>Price:</h5>
                                            <p>&#8377; {topFoodItem.price}</p>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <h5>Quantity:</h5>
                                            <p>{topFoodItem.quantity}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <h4>Restaurant: </h4>{' '}
                                        <p style={{ marginLeft: '10px' }}>
                                            {
                                                topFoodItem.restaurant
                                                    ?.restaurantName
                                            }
                                        </p>
                                    </div>
                                    <div className="btns-container">
                                        <Link to="/all-food-items">
                                            <button className="btn">
                                                Order now
                                            </button>
                                        </Link>
                                        <Link to="/all-food-items">
                                            <button className="btn">
                                                Add to Cart
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div>
    );
}

export default CustomerDashboard;
