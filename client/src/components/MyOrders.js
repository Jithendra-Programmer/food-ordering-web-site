// importing packages
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// importing icons
import { MdDelete } from 'react-icons/md';

// imporing component
import { CustomerNav } from './layouts/Nav';
import Footer from './layouts/Footer';

// importing baseURL
import { baseURL } from '../App';

// MyOrders component
function MyOrders() {
    // user data
    let token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    let user = useRef(JSON.parse(localStorage.getItem('userDetails')).user);

    // state variables
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // fetch all orders
        fetch(`${baseURL}/customer/myorders/${user.current._id}`, {
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                data.reverse();
                setOrders(data);
            })
            .catch((err) => console.log(err));
    }, []);

    // function to delete order
    const cancelOrder = (id, index) => {
        fetch(`${baseURL}/order/cancelOrder/${id}`, {
            method: 'DELETE',
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    let tempData = [...orders];
                    tempData.splice(index, 1);
                    setOrders(tempData);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="customer-dashboard">
            {/* nav bar */}
            <CustomerNav style={{ background: 'rgba(0, 0, 0, 1)' }} />

            {/* my orders */}
            <section className="my-orders-container container">
                {/* title */}
                <h1 className="title">My Orders</h1>

                {/* my orders */}
                <div className="orders">
                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ color: '#0061ff' }}>No Items Found</h1>
                            <Link to="/all-food-items">
                                <button
                                    className="btn"
                                    style={{ width: '100%', marginTop: '10px' }}
                                >
                                    Explore
                                </button>
                            </Link>
                        </div>
                    ) : (
                        orders.map((order, key) => (
                            <div className="order" key={key}>
                                {order.orderStatus === 'pending' ? (
                                    <button
                                        onClick={() =>
                                            cancelOrder(order._id, key)
                                        }
                                        className="delete-btn"
                                    >
                                        <MdDelete />
                                    </button>
                                ) : null}

                                <img
                                    alt="order-img"
                                    className="order-img"
                                    src={`${baseURL}/food/image/${order.foodItem.pic}`}
                                />
                                <div className="order-details">
                                    <h1
                                        style={{
                                            fontSize: '28px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        {order.foodItem.name}{' '}
                                        <span
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                textTransform: 'lowercase',
                                            }}
                                        >
                                            From{' '}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: '600',
                                                textTransform: 'none',
                                            }}
                                        >
                                            {order.restaurant.restaurantName}
                                        </span>
                                    </h1>

                                    <p
                                        style={{
                                            fontSize: '15px',
                                            marginTop: '5px',
                                            fontWeight: '400',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        {order.customer.address}
                                    </p>

                                    <div
                                        style={{
                                            marginTop: '5px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                fontWeight: '600',
                                                width: '50%',
                                            }}
                                        >
                                            Quantity:{' '}
                                            <span
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                {order.quantity}
                                            </span>
                                        </h4>

                                        <h4
                                            style={{
                                                fontWeight: '600',
                                                width: '50%',
                                            }}
                                        >
                                            Price:{' '}
                                            <span
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                {order.foodItem.price *
                                                    order.quantity}
                                            </span>
                                        </h4>

                                        <h4
                                            style={{
                                                fontWeight: '600',
                                                width: '50%',
                                            }}
                                        >
                                            Status:{' '}
                                            <span
                                                style={
                                                    order.orderStatus ===
                                                    'accepted'
                                                        ? {
                                                              fontFamily:
                                                                  'monospace',
                                                              fontWeight: '400',
                                                              color: 'green',
                                                          }
                                                        : order.orderStatus ===
                                                          'rejected'
                                                        ? {
                                                              fontFamily:
                                                                  'monospace',
                                                              fontWeight: '400',
                                                              color: 'red',
                                                          }
                                                        : {
                                                              fontFamily:
                                                                  'monospace',
                                                              fontWeight: '400',
                                                              // color: 'red'
                                                          }
                                                }
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </h4>
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

export default MyOrders;
