// importing packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// importing css
import './styles/auth.css';

// importing baseURL
import { baseURL } from '../App';

// CustomerSignup component
function CustomerSignup() {
    // creating css for message box
    let messageVisibleCss = {
        bottom: '3vh',
    };

    let messageNotVisibleCss = {
        bottom: '-10vh',
    };

    // creating navigate
    const navigate = useNavigate();

    // creating state variables
    const [message, setMessage] = useState('');
    const [isMessage, setIsMessage] = useState(false);
    const [customerData, setCustomerData] = useState({});

    // function to read value from input
    const readValue = (property, value) => {
        let tempCustomerData = { ...customerData };
        tempCustomerData[property] = value;
        setCustomerData(tempCustomerData);
    };

    // function to create user
    const signup = (event) => {
        event.preventDefault();

        let tempCustomerData = { ...customerData };
        tempCustomerData.username = tempCustomerData.username.toLowerCase();
        tempCustomerData.mail = tempCustomerData.mail.toLowerCase();

        if (customerData.password === customerData.conform_password) {
            fetch(`${baseURL}/customer/signup`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(tempCustomerData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setCustomerData({});
                        navigate('/customer/login');
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
        <div className="customer-auth auth">
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
                <h1 className="title">Customer Signup</h1>

                {/* signup form */}
                <form className="form" onSubmit={(event) => signup(event)}>
                    <input
                        value={customerData?.username}
                        onChange={(event) =>
                            readValue('username', event.target.value)
                        }
                        type="text"
                        placeholder="Enter Username"
                        className="input-feild"
                    />
                    <input
                        value={customerData?.mobile}
                        onChange={(event) =>
                            readValue('mobile', event.target.value)
                        }
                        type="number"
                        placeholder="Enter Mobile number"
                        className="input-feild"
                    />
                    <input
                        value={customerData.mail}
                        onChange={(event) =>
                            readValue('mail', event.target.value)
                        }
                        type="email"
                        placeholder="Enter mail"
                        className="input-feild"
                    />

                    <input
                        value={customerData.password}
                        onChange={(event) =>
                            readValue('password', event.target.value)
                        }
                        type="password"
                        placeholder="Enter Password"
                        className="input-feild"
                    />
                    <input
                        value={customerData.conform_password}
                        onChange={(event) =>
                            readValue('conform_password', event.target.value)
                        }
                        type="password"
                        placeholder="Conform Password"
                        className="input-feild"
                    />
                    <button className="btn" type="submit">
                        Signup
                    </button>
                </form>

                {/* links to navigate */}
                <p style={{ marginTop: '10px' }}>
                    <Link to="/customer/login" className="link">
                        Already have an account?
                    </Link>
                </p>
                <p>
                    <Link to="/restaurant/signup" className="link">
                        Join as Restaurant Admin
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default CustomerSignup;
