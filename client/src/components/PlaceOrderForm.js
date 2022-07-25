// importing packages
import { useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// importing Component
import { CustomerNav } from './layouts/Nav';

// importing baseURL
import { baseURL } from '../App';

// PlaceOrderForm component
function PlaceOrderForm() {
    // user data
    let token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('userDetails')).user,
    );

    // state variables
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    let myCartItems = useLocation().state.myCartItems;
    let foodItemData = useLocation().state.foodItem;
    const params = useParams();

    // function to read value of input
    const readValue = (property, value) => {
        let tempUser = { ...user };
        tempUser[property] = value;
        let tempData = JSON.parse(localStorage.getItem('userDetails'));
        tempData.user = tempUser;
        localStorage.setItem('userDetails', JSON.stringify(tempData));
        setUser(tempUser);
    };

    // function to place order
    const placeOrder = (event) => {
        event.preventDefault();
        fetch(`${baseURL}/customer/update/${user._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => {
                if (params.id === 'cart') {
                    let data = { cartItems: myCartItems };
                    fetch(`${baseURL}/cart/checkOut`, {
                        method: 'POST',
                        headers: {
                            authorization: `bearer ${token.current}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.success) {
                                navigate('/customer/myorders');
                            }
                        })
                        .catch((err) => console.log(err));
                } else {
                    let restaurant = { ...foodItemData['restaurant'] };
                    let foodItem = { ...foodItemData };
                    foodItem.restaurant = foodItem.restaurant._id;

                    fetch(`${baseURL}/order/create`, {
                        method: 'POST',
                        headers: {
                            authorization: `bearer ${token.current}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            customer: user,
                            foodItem,
                            restaurant,
                            quantity,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) =>
                            data.success
                                ? navigate('/customer/myorders')
                                : null,
                        )
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="customer-dashboard">
            {/* nav bar */}
            <CustomerNav style={{ background: 'rgba(0, 0, 0, 1)' }} />

            {/* place order form */}
            <section className="container order-form-container-parent">
                <div className="order-form-container">
                    {/* title */}
                    <h1 className="title">Place Order</h1>

                    {/* place order form */}
                    <form onSubmit={(event) => placeOrder(event)}>
                        <input
                            onChange={(event) =>
                                readValue('mobile', event.target.value)
                            }
                            type="number"
                            className="input-feild"
                            placeholder="Enter Mobile Number"
                            value={user?.mobile}
                            required
                        />
                        <textarea
                            minLength="10"
                            className="input-feild"
                            type="text"
                            placeholder="Enter Address"
                            value={user?.address}
                            onChange={(event) =>
                                readValue('address', event.target.value)
                            }
                            required
                        />
                        {params.id !== 'cart' ? (
                            <input
                                type="number"
                                placeholder="Enter Quantity"
                                className="input-feild"
                                value={quantity}
                                required
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                            />
                        ) : null}
                        <button type="submit" className="btn">
                            Place Order
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default PlaceOrderForm;
