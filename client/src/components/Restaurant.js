// importing packages
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// importing components
import { CustomerNav } from './layouts/Nav';
import Footer from './layouts/Footer';

// importing baseURL
import { baseURL } from '../App';

function Restaurant() {
    // user data
    const token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    const user = JSON.parse(localStorage.getItem('userDetails')).user;

    // css for message box
    let messageVisibleCss = {
        left: '2vw',
    };
    let messageNotVisibleCss = {
        left: '-100vw',
    };

    const restaurantId = useRef(useParams().id);

    // state variables
    const [message, setMessage] = useState('');
    const [isMessage, setIsMessage] = useState(false);
    const [restaurant, setRestaurant] = useState(' ');
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        // fetch food items and data about restaurant
        fetch(`${baseURL}/restaurant/get/${restaurantId.current}`, {
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRestaurant(data.restaurant);
                setFoodItems(data.foodItems);
            })
            .catch((err) => console.log(err));
    }, []);

    // function to add food item to cart
    const addToCart = (id) => {
        let cartData = { foodItem: id, customer: user._id };

        fetch(`${baseURL}/cart/addItem`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    setIsMessage(true);
                    setMessage(data.message);
                    setTimeout(() => setIsMessage(false), 3000);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="customer-dashboard">
            {/* message box */}
            {isMessage ? (
                <div
                    style={messageVisibleCss}
                    className="message-container restaurant-details-msg-box"
                >
                    <h1 className="error-message">{message}</h1>
                </div>
            ) : (
                <div
                    style={messageNotVisibleCss}
                    className="message-container restaurant-details-msg-box"
                >
                    <h1 className="error-message">{message}</h1>
                </div>
            )}

            {/* nav bar */}
            <CustomerNav style={{ background: 'rgba(0,0,0,1)' }} />

            {/* restaurant details */}
            {restaurant !== ' ' ? (
                <section className="restaurant-details-container container">
                    <div className="restaurant-details-container-child">
                        <img
                            alt="restaurant-img"
                            src={`${baseURL}/restaurant/image/${restaurant?.pic}`}
                            className="restaurant-img"
                        />

                        <div className="restaurant-details">
                            <h1 style={{ fontSize: '50px' }} className="title">
                                {restaurant?.restaurantName}
                            </h1>
                            <h2
                                style={{
                                    letterSpacing: '1px',
                                    marginBottom: '10px',
                                    fontSize: '25px',
                                }}
                            >
                                Address:{' '}
                            </h2>
                            <p
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '25px',
                                }}
                            >
                                {restaurant?.address}
                            </p>

                            <div
                                className="timings-conainer"
                                style={{
                                    marginTop: '15px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div style={{ width: '50%' }}>
                                    <h2
                                        style={{
                                            fontSize: '25px',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Opening Time:{' '}
                                    </h2>
                                    <p
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: '24px',
                                            marginTop: '7px',
                                        }}
                                    >
                                        {new Date(
                                            '2006-03-24T' +
                                                restaurant?.openingTime +
                                                'Z',
                                        ).toLocaleTimeString('en-IN', {
                                            timeZone: 'UTC',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div style={{ width: '50%' }}>
                                    <h2
                                        style={{
                                            fontSize: '25px',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Closing Time:{' '}
                                    </h2>
                                    <p
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: '24px',
                                            marginTop: '7px',
                                        }}
                                    >
                                        {new Date(
                                            '2006-03-24T' +
                                                restaurant?.closingTime +
                                                'Z',
                                        ).toLocaleTimeString('en-IN', {
                                            timeZone: 'UTC',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            )}

            {/* foos items */}
            <section className="restaurant-foodItems-container container">
                {/* title */}
                <h1 className="title">Food Items</h1>

                {/* food items */}
                <div className="food-items">
                    {foodItems.length === 0 ? (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>
                    ) : (
                        foodItems.map((foodItem, key) => (
                            <div className="food-item-card" key={key}>
                                <img
                                    alt="food-item-pic"
                                    className="food-item-card-img"
                                    src={`${baseURL}/food/image/${foodItem.pic}`}
                                />
                                <div className="food-item-details">
                                    <h1 className="title">{foodItem.name}</h1>
                                    <p>{foodItem.description}</p>
                                    <div className="price-quantity-container">
                                        <div style={{ width: '50%' }}>
                                            <h4>Price</h4>
                                            <p>&#8377; {foodItem.price}</p>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <h4>Quantity</h4>
                                            <p>{foodItem.quantity} Left</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <h4>Restaurant: </h4>{' '}
                                        <p style={{ marginLeft: '10px' }}>
                                            {
                                                foodItem.restaurant
                                                    ?.restaurantName
                                            }
                                        </p>
                                    </div>
                                    {foodItem.quantity > 0 ? (
                                        <div className="btns-container">
                                            <Link
                                                to={`/place-order-form/${foodItem._id}`}
                                                state={{ foodItem }}
                                            >
                                                <button
                                                    onClick={() => {}}
                                                    className="btn"
                                                >
                                                    Order now
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    addToCart(foodItem._id)
                                                }
                                                className="btn"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    ) : (
                                        <h1
                                            style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                marginTop: '20px',
                                                fontSize: '30px',
                                                cursor: 'no-drop',
                                            }}
                                        >
                                            Out of Stock
                                        </h1>
                                    )}
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

export default Restaurant;
