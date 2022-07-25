// importing packages
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// importing icons
import { MdDelete, MdDone, MdEdit } from 'react-icons/md';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

// importing components
import { CustomerNav } from './layouts/Nav';
import Footer from './layouts/Footer';

// importing baseURL
import { baseURL } from '../App';

// MyCart Component
function MyCart() {
    // creating navigate
    const navigate = useNavigate();

    // user data
    const token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    const user = useRef(JSON.parse(localStorage.getItem('userDetails')).user);

    // state variables
    const [myCartItems, setMyCartItems] = useState([]);
    const [isQuantity, setIsQuantity] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // fetch all cart items
        fetch(`${baseURL}/customer/mycart/${user.current._id}`, {
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => setMyCartItems(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // total price
        if (myCartItems.length !== 0) {
            let tempTotalPrice = 0;
            myCartItems.forEach((i) => {
                tempTotalPrice += i.foodItem.price * i.quantity;
            });
            setTotalPrice(tempTotalPrice);
        } else if (myCartItems.length === 0) {
            setTotalPrice(0);
        }
    }, [myCartItems]);

    // function to delete cart item
    const deleteItem = (id, index) => {
        fetch(`${baseURL}/cart/deleteItem/${id}`, {
            method: 'DELETE',
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then(() => {
                let tempCartItems = [...myCartItems];
                tempCartItems.splice(index, 1);
                setMyCartItems(tempCartItems);
            })
            .catch((err) => console.log(err));
    };

    // function to read value from input
    const readQuantity = (index, value) => {
        console.log(value);
        let tempCartItems = [...myCartItems];
        tempCartItems[index]['quantity'] = value;
        setMyCartItems(tempCartItems);
        changeQuantity(tempCartItems[index]._id, index);
    };

    // function to update quantity
    const changeQuantity = (id, index) => {
        let updateData = myCartItems[index];
        fetch(`${baseURL}/cart/updateItem/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then(() => null)
            .catch((err) => console.log(err));
    };

    return (
        <div className="customer-dashboard">
            {/* nav bar */}
            <CustomerNav style={{ background: 'rgba(0, 0, 0, 1)' }} />

            {/* my cart items */}
            <section className="my-cart-container container">
                {/* title */}
                <h1 className="title">My Cart</h1>

                {/* my cart items */}
                <div className="my-cart-items">
                    {myCartItems.length === 0 ? (
                        <div style={{ textAlign: 'center' }}>
                            <h1>No Items Found</h1>
                            <Link to="/all-food-items">
                                <button className="btn">Explore</button>
                            </Link>
                        </div>
                    ) : (
                        myCartItems.map((cartItem, key) => (
                            <div className="my-cart-item" key={key}>
                                <img
                                    alt="food-item-img"
                                    className="cart-item-img"
                                    src={`${baseURL}/food/image/${cartItem.foodItem.pic}`}
                                />

                                <div className="cart-item-details">
                                    <div style={{ width: '30%' }}>
                                        <h1
                                            style={{
                                                textTransform: 'uppercase',
                                                fontSize: '22px',
                                            }}
                                        >
                                            {cartItem.foodItem.name}
                                        </h1>
                                        <p
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {cartItem.foodItem.description}
                                        </p>
                                    </div>

                                    <div
                                        className="price-quantity-container"
                                        style={{
                                            width: '65%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{ width: '46%' }}
                                            className="price-container"
                                        >
                                            <h1 style={{ fontSize: '22px' }}>
                                                Price
                                            </h1>
                                            <p
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                {cartItem.foodItem.price *
                                                    cartItem.quantity}
                                            </p>
                                        </div>

                                        <div
                                            style={{ width: '46%' }}
                                            className="quantity-container"
                                        >
                                            <h1 style={{ fontSize: '22px' }}>
                                                Quantity
                                            </h1>
                                            {isQuantity ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <FaMinusCircle
                                                        onClick={() => {
                                                            let currentQuantity =
                                                                cartItem.quantity -
                                                                1;
                                                            if (
                                                                currentQuantity >
                                                                0
                                                            ) {
                                                                readQuantity(
                                                                    key,
                                                                    currentQuantity,
                                                                );
                                                            }
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                    <span>
                                                        {cartItem.quantity}
                                                    </span>
                                                    <FaPlusCircle
                                                        onClick={() => {
                                                            let currentQuantity =
                                                                cartItem.quantity +
                                                                1;
                                                            readQuantity(
                                                                key,
                                                                currentQuantity,
                                                            );
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            marginLeft: '10px',
                                                        }}
                                                    />
                                                    <MdDone
                                                        onClick={() =>
                                                            setIsQuantity(false)
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                            marginLeft: '10px',
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <p
                                                    style={{
                                                        fontFamily: 'monospace',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    <span>
                                                        {cartItem.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            setIsQuantity(true)
                                                        }
                                                        style={{
                                                            marginLeft: '5px',
                                                            cursor: 'pointer',
                                                            fontWeight:
                                                                'lighter',
                                                            color: '#707eb9',
                                                            border: 'none',
                                                            background:
                                                                'transparent',
                                                        }}
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            deleteItem(cartItem._id, key)
                                        }
                                        className="delete-btn"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Check out */}
                <div
                    className="check-out"
                    style={{ width: '70%', margin: 'auto' }}
                >
                    {/* <h1>Check Out</h1> */}
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            boxSizing: 'border-box',
                            justifyContent: 'space-between',
                            color: '#0061ff',
                            marginTop: '20px',
                        }}
                    >
                        <h1>Total Price</h1>
                        <h1 className="price" style={{ marginRight: '40px ' }}>
                            &#8377; {totalPrice}
                        </h1>
                    </div>

                    <button
                        style={{
                            float: 'right',
                            width: '150px',
                            marginTop: '5px',
                        }}
                        className="btn"
                        onClick={() =>
                            navigate('/place-order-form/cart', {
                                state: { myCartItems },
                            })
                        }
                    >
                        Place Order
                    </button>
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div>
    );
}

export default MyCart;
