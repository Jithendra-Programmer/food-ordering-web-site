// importing packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// importing css
import './styles/auth.css';

// importing baseURL
import { baseURL } from '../App';

// RestaurantSignup Component
function RestaurantSignup() {
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

    let formData = new FormData();

    // function to read value of input
    const readValue = (property, value) => {
        formData.append(property, value);
    };

    // function to create user
    const signup = (event) => {
        event.preventDefault();
        console.log(formData);

        if (formData.password === formData.conform_password) {
            fetch(`${baseURL}/restaurant/signup`, {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate('/restaurant/login');
                    } else {
                        setMessage(data.message);
                        setIsMessage(true);
                        setTimeout(() => setIsMessage(false), 3000);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setMessage('Passwords do not match');
            setIsMessage(true);
            setTimeout(() => setIsMessage(false), 3000);
        }
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
                <h1 className="title">Restaurant Signup</h1>

                {/* signup form */}
                <form className="form" onSubmit={(event) => signup(event)}>
                    <input
                        onChange={(event) =>
                            readValue('restaurantName', event.target.value)
                        }
                        type="text"
                        placeholder="Enter Restaurant Name"
                        className="input-feild"
                        required
                    />
                    <textarea
                        minLength="10"
                        onChange={(event) =>
                            readValue('address', event.target.value)
                        }
                        placeholder="Enter address"
                        className="input-feild"
                        required
                    />
                    <div className="time-input-container">
                        <div className="input-feild-container">
                            <label className="label" htmlFor="openingTime">
                                Opening Time
                            </label>
                            <input
                                onChange={(event) =>
                                    readValue('openingTime', event.target.value)
                                }
                                id="openingTime"
                                className="input-feild"
                                type="time"
                                placeholder="opening time"
                                required
                            />
                        </div>
                        <div className="input-feild-container">
                            <label className="label" htmlFor="colsingTime">
                                Colsing Time
                            </label>
                            <input
                                onChange={(event) =>
                                    readValue('closingTime', event.target.value)
                                }
                                id="colsingTime"
                                className="input-feild"
                                type="time"
                                placeholder="colsing time"
                                required
                            />
                        </div>
                    </div>

                    <input
                        onChange={(event) =>
                            readValue('password', event.target.value)
                        }
                        type="password"
                        placeholder="Enter Password"
                        className="input-feild"
                        required
                    />
                    <input
                        onChange={(event) =>
                            readValue('conform_password', event.target.value)
                        }
                        type="password"
                        placeholder="Conform Password"
                        className="input-feild"
                        required
                    />
                    <input
                        style={{ background: 'transparent', color: '#fff' }}
                        onChange={(event) =>
                            readValue('image', event.target.files[0])
                        }
                        type="file"
                        placeholder="image"
                        name="image"
                        className="input-feild"
                        required
                    />
                    <button className="btn" type="submit">
                        Signup
                    </button>
                </form>

                {/* links to navigate */}
                <p style={{ marginTop: '10px' }}>
                    <Link to="/restaurant/login" className="link">
                        Already have an account?
                    </Link>
                </p>
                <p>
                    <Link to="/customer/signup" className="link">
                        Join as Customer
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RestaurantSignup;
