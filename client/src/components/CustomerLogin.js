// importing packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// importing css
import './styles/auth.css';

// importing baseURL
import { baseURL } from '../App';

// CustomerLogin component
function CustomerLogin() {
    // creating css data for message box
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
    const [customerCred, setCustomerCred] = useState({ role: 'customer' });

    // function to real value from input
    const readValue = (property, value) => {
        let tempCustomerCred = { ...customerCred };
        tempCustomerCred[property] = value;
        setCustomerCred(tempCustomerCred);
    };

    // function to log in the user
    const login = (event) => {
        event.preventDefault();

        let tempCustomerCred = { ...customerCred };
        tempCustomerCred.username = tempCustomerCred.username.toLowerCase();

        fetch(`${baseURL}/customer/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(tempCustomerCred),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCustomerCred({ role: 'customer' });
                    localStorage.setItem('userDetails', JSON.stringify(data));
                    navigate('/home');
                } else {
                    setMessage(data.message);
                    setIsMessage(true);
                    setTimeout(() => setIsMessage(false), 3000);
                }
            })
            .catch((err) => {
                console.log(err);
                setMessage('Internal Server error');
                setIsMessage(true);
                setTimeout(() => setIsMessage(false), 3000);
            });
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
                <h1 className="title">Customer Login</h1>

                {/* login form */}
                <form className="form" onSubmit={(event) => login(event)}>
                    <input
                        value={customerCred?.username}
                        onChange={(event) =>
                            readValue('username', event.target.value)
                        }
                        type="text"
                        placeholder="Enter Username"
                        className="input-feild"
                    />
                    <input
                        value={customerCred?.password}
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
                    <Link to="/customer/signup" className="link">
                        Dont have an account?
                    </Link>
                </p>
                <p>
                    <Link to="/restaurant/login" className="link">
                        Login as a Restaurant admin
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default CustomerLogin;
