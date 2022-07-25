// importing packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// importing components
import { CustomerNav } from './layouts/Nav';
import Footer from './layouts/Footer';

// importing base url
import { baseURL } from '../App';

// Component to display all food items
function AllFoodItems() {
    // message box css data
    let messageVisibleCss = {
        bottom: '3vh',
    };
    let messageNotVisibleCss = {
        bottom: '-10vh',
    };

    // creating state variables
    const [message, setMessage] = useState('');
    const [isMessage, setIsMessage] = useState(false);

    const [foodItems, setFoodItems] = useState([]);

    // creating user info
    const token = JSON.parse(localStorage.getItem('userDetails')).token;
    const user = JSON.parse(localStorage.getItem('userDetails')).user;

    useEffect(() => {
        // to get the all food items
        fetch(`${baseURL}/food/getItems`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFoodItems(data);
            })
            .catch((err) => console.log(err));
    }, []);

    // function to add food items to cart
    const addToCart = (id) => {
        let cartData = { foodItem: id, customer: user._id };

        fetch(`${baseURL}/cart/addItem`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMessage(data.message);
                    setIsMessage(true);
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
                    style={{
                        width: '100%',
                        height: '100vh',
                        position: 'fixed',
                        overflow: 'hidden',
                        cursor: 'not-allowed',
                    }}
                >
                    <div
                        style={messageVisibleCss}
                        className="message-container"
                    >
                        <h1 className="error-message">{message}</h1>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100vh',
                        position: 'fixed',
                        overflow: 'hidden',
                        visibility: 'hidden',
                    }}
                >
                    <div
                        style={messageNotVisibleCss}
                        className="message-container"
                    >
                        <h1 className="error-message">{message}</h1>
                    </div>
                </div>
            )}

            {/* Nav bar */}
            <CustomerNav style={{ background: 'rgba(0, 0, 0, 1)' }} />

            {/* banner */}
            <section className="customer-banner"></section>

            {/* all fooitems list */}
            <section className="food-items-container container">
                <h1 className="title">Food Items</h1>

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

export default AllFoodItems;
