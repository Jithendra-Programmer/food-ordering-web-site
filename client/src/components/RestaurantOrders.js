// importing packages
import { useEffect, useRef, useState } from 'react';

// importing icons
import { MdDone, MdClose } from 'react-icons/md';

// importing component
import { RestaurantNav } from './layouts/Nav';

// importing css
import './styles/restaurantDashboard.css';

// importing baseURL
import { baseURL } from '../App';

// restaurant orders component
function RestaurantOrders() {
    // user data
    const token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    const restaurant = useRef(
        JSON.parse(localStorage.getItem('userDetails')).user,
    );

    // state variables
    const [orignalOrders, setOrignalOrders] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // fetch orders
        fetch(`${baseURL}/restaurant/orders/${restaurant.current._id}`, {
            method: 'GET',
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                data.reverse();
                // console.log(data);
                setOrignalOrders(data);
                setOrders(data);
            })
            .catch((err) => console.log(err));
    }, []);

    // function to accept orders
    const acceptOrder = (id, index) => {
        fetch(`${baseURL}/order/changeStatus/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ orderStatus: 'accepted' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    let tempOrders = [...orders];
                    tempOrders[index].orderStatus = 'accepted';
                    setOrders(tempOrders);
                }
            })
            .catch((err) => console.log(err));
    };

    // function to reject orders
    const rejectOrder = (id, index) => {
        let foodItem = orders[index].foodItem._id;
        let quantity = orders[index].quantity;
        console.log(quantity);

        fetch(`${baseURL}/order/changeStatus/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orderStatus: 'rejected',
                foodItem: foodItem,
                quantity: quantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    let tempOrders = [...orders];
                    tempOrders[index].orderStatus = 'rejected';
                    setOrders(tempOrders);
                }
            })
            .catch((err) => console.log(err));
    };

    // function to filter orders by order status
    const filterByOrderStatus = (value) => {
        console.log(orignalOrders);
        if (value === 'all') {
            setOrders(orignalOrders);
        } else if (value === 'pending') {
            let tempOrders = [...orignalOrders];
            let filteredData = tempOrders.filter(
                (order) => order.orderStatus === 'pending',
            );
            setOrders(filteredData);
        } else if (value === 'rejected') {
            let tempOrders = [...orignalOrders];
            let filteredData = tempOrders.filter(
                (order) => order.orderStatus === 'rejected',
            );
            setOrders(filteredData);
        } else if (value === 'accepted') {
            let tempOrders = [...orignalOrders];
            let filteredData = tempOrders.filter(
                (order) => order.orderStatus === 'accepted',
            );
            setOrders(filteredData);
        }
    };

    return (
        <div className="restaurant-dashboard">
            {/* nav bar */}
            <RestaurantNav />

            {/* restaurant orders */}
            <section className="container restaurant-orders">
                {/* title */}
                <div className="title-container">
                    <h1 className="title">My Orders</h1>

                    <div
                        style={{ color: '#0061ff' }}
                        className="filter-container"
                    >
                        <label
                            style={{
                                fontWeight: '600',
                                fontSize: '18px',
                                marginRight: '5px',
                            }}
                            htmlFor="order-status"
                        >
                            Order Status:{' '}
                        </label>

                        <select
                            onChange={(event) =>
                                filterByOrderStatus(event.target.value)
                            }
                            id="order-status"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* orders */}
                <div className="orders-container">
                    {orders.length === 0 ? (
                        <div>
                            <h1>No Orders Found</h1>
                        </div>
                    ) : (
                        orders.map((order, key) => (
                            <div className="order-parent" key={key}>
                                <div className="order">
                                    <img
                                        src={`${baseURL}/food/image/${order.foodItem?.pic}`}
                                        alt="order-img"
                                        className="order-img"
                                    />

                                    <div className="order-details">
                                        <h1
                                            className="title"
                                            style={{
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                            }}
                                        >
                                            {order.foodItem?.name}
                                        </h1>
                                        <div
                                            className="customer-details"
                                            style={{ marginTop: '5px' }}
                                        >
                                            <h4
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Username:{' '}
                                                <span
                                                    style={{
                                                        fontWeight: '400',
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    {order.customer.username}
                                                </span>
                                            </h4>
                                            <h4
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Address:{' '}
                                                <span
                                                    style={{
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {order.customer.address}
                                                </span>
                                            </h4>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    marginTop: '3px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        width: '50%',
                                                        fontFamily: 'monospace',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: '600',
                                                            fontFamily:
                                                                'sans-serif',
                                                        }}
                                                    >
                                                        Mail:{' '}
                                                    </span>
                                                    {order.customer.mail}
                                                </p>

                                                <p
                                                    style={{
                                                        width: '50%',
                                                        fontFamily: 'monospace',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: '600',
                                                            fontFamily:
                                                                'sans-serif',
                                                        }}
                                                    >
                                                        Mobile:{' '}
                                                    </span>
                                                    {order.customer.mobile}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '5px',
                                            }}
                                        >
                                            <h4>
                                                Quantity:{' '}
                                                <span
                                                    style={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: '400',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    {order.quantity}
                                                </span>
                                            </h4>
                                            <h4>
                                                Status:{' '}
                                                <span
                                                    style={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: '400',
                                                        fontSize: '16px',
                                                        letterSpacing: '1px',
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </h4>
                                            <h4>
                                                Order at :{' '}
                                                <span
                                                    style={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: '400',
                                                        fontSize: '16px',
                                                        letterSpacing: '1px',
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    {new Date(
                                                        order.createdAt,
                                                    ).toLocaleTimeString()}{' '}
                                                    {new Date(
                                                        order.createdAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </h4>
                                        </div>
                                    </div>

                                    {order.orderStatus === 'pending' ? (
                                        <div className="btns-container">
                                            <button
                                                onClick={() =>
                                                    acceptOrder(order._id, key)
                                                }
                                                className="status-btn accept-btn"
                                            >
                                                <MdDone
                                                    style={{
                                                        fontSize: '18px',
                                                    }}
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    rejectOrder(order._id, key)
                                                }
                                                className="status-btn reject-btn"
                                            >
                                                <MdClose
                                                    style={{
                                                        fontSize: '18px',
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    ) : null}
                                </div>

                                {order.orderStatus === 'pending' ? (
                                    <div className="mob-btns-container">
                                        <button
                                            onClick={() =>
                                                acceptOrder(order._id, key)
                                            }
                                            className="status-btn accept-btn"
                                        >
                                            <MdDone
                                                style={{
                                                    fontSize: '18px',
                                                }}
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                rejectOrder(order._id, key)
                                            }
                                            className="status-btn reject-btn"
                                        >
                                            <MdClose
                                                style={{
                                                    fontSize: '18px',
                                                }}
                                            />
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

export default RestaurantOrders;
