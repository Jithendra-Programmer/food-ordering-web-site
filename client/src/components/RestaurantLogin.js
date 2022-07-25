import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../App';

function RestaurantLogin() {
    // css for message box
    let messageVisibleCss = {
        bottom: '3vh',
    };

    let messageNotVisibleCss = {
        bottom: '-10vh',
    };

    const navigate = useNavigate();

    // state variables
    const [message, setMessage] = useState('');
    const [isMessage, setIsMessage] = useState(false);
    const [restaurantCred, setRestaurantCred] = useState({
        role: 'restaurant',
    });

    // function to read value of input
    const readValue = (property, value) => {
        let tempRestaurantCred = { ...restaurantCred };
        tempRestaurantCred[property] = value;
        setRestaurantCred(tempRestaurantCred);
    };

    // function to login user
    const login = (event) => {
        event.preventDefault();

        fetch(`${baseURL}/restaurant/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(restaurantCred),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRestaurantCred({ role: 'restaurant' });
                    localStorage.setItem('userDetails', JSON.stringify(data));
                    navigate('/restaurant/orders');
                } else {
                    setMessage(data.message);
                    setIsMessage(true);
                    setTimeout(() => setIsMessage(false), 3000);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="restaurant-auth auth">
            {/* message box */}
            {isMessage ? (
                <div style={messageVisibleCss} className="message-container">
                    <h1 className="error-message">{message}</h1>
                </div>
            ) : (
                <div style={messageNotVisibleCss} className="message-container">
                    <h1 className="error-message">{message}</h1>
                </div>
            )}

            <div className="auth-container">
                {/* title */}
                <h1 className="title">Restaurant Login</h1>

                {/* login form */}
                <form className="form" onSubmit={(event) => login(event)}>
                    <input
                        value={restaurantCred.restaurantName}
                        onChange={(event) =>
                            readValue('restaurantName', event.target.value)
                        }
                        type="text"
                        placeholder="Enter Restaurant Name"
                        className="input-feild"
                    />

                    <input
                        value={restaurantCred.password}
                        onChange={(event) =>
                            readValue('password', event.target.value)
                        }
                        type="password"
                        placeholder="Enter Password"
                        className="input-feild"
                    />

                    <button className="btn" type="submit">
                        Login
                    </button>
                </form>

                {/* links to navigate */}
                <p style={{ marginTop: '10px' }}>
                    <Link to="/restaurant/signup" className="link">
                        Dont have an account?
                    </Link>
                </p>
                <p>
                    <Link to="/customer/login" className="link">
                        Login as a Customer
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RestaurantLogin;
