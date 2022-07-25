// importing required functions
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// importing css files
import './App.css';

// importing components
import LandingPage from './components/LandingPage';
import CustomerLogin from './components/CustomerLogin';
import CustomerSignup from './components/CustomerSignup';
import RestaurantLogin from './components/RestaurantLogin';
import RestaurantSignup from './components/RestaurantSignup';
import RestaurantOrders from './components/RestaurantOrders';
import RestaurantFoodItems from './components/RestaurantFoodItems';
import AllFoodItems from './components/AllFoodItems';
import AllRestaurants from './components/AllRestaurants';
import MyCart from './components/MyCart';
import MyOrders from './components/MyOrders';
import PlaceOrderForm from './components/PlaceOrderForm';
import Restaurant from './components/Restaurant';
import CustomerDashboard from './components/CustomerDashboard';

// App componnet
export default function App() {
    // function to check weather the customer is loged in or out
    const RequireCustomerAuth = ({ children, redirectTo }) => {
        let isAuth = localStorage.getItem('userDetails');

        if (isAuth != null) {
            if (JSON.parse(isAuth).user.role === 'customer') {
                return children;
            } else {
                return <Navigate to="/restaurant/orders" />;
            }
        } else {
            return <Navigate to={redirectTo} />;
        }
    };

    // function to check weather the restaurant admin is loged in or out
    const RequireRestaurantAuth = ({ children, redirectTo }) => {
        let isAuth = localStorage.getItem('userDetails');

        if (isAuth != null) {
            if (JSON.parse(isAuth).user.role === 'restaurant') {
                return children;
            } else {
                return <Navigate to="/home" />;
            }
        } else {
            return <Navigate to={redirectTo} />;
        }
    };

    // function to check is the user is loged or not
    const RequireMainPageAuth = () => {
        let user = localStorage.getItem('userDetails');
        if (user !== null) {
            let role = JSON.parse(user).user.role;
            if (role === 'customer') {
                return <Navigate to="/home" />;
            } else if (role === 'restaurant') {
                return <Navigate to="/restaurant/orders" />;
            }
        } else {
            return <LandingPage />;
        }
    };

    // function to check is the user is loged or not on home route
    const RequireHomePageAuth = () => {
        let user = localStorage.getItem('userDetails');
        if (user !== null) {
            let role = JSON.parse(user).user.role;
            if (role === 'customer') {
                return <CustomerDashboard />;
            } else if (role === 'restaurant') {
                return <Navigate to="/restaurant/orders" />;
            }
        } else {
            return <Navigate to="/" />;
        }
    };

    return (
        <BrowserRouter>
            {/* initializing all the routes */}

            <Routes>
                <Route path="/" element={<RequireMainPageAuth />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route path="/customer/signup" element={<CustomerSignup />} />
                <Route path="/restaurant/login" element={<RestaurantLogin />} />
                <Route
                    path="/restaurant/signup"
                    element={<RestaurantSignup />}
                />

                <Route path="/home" element={<RequireHomePageAuth />} />
                <Route
                    path="/restaurant/orders"
                    element={
                        <RequireRestaurantAuth redirectTo="/restaurant/login">
                            <RestaurantOrders />
                        </RequireRestaurantAuth>
                    }
                />
                <Route
                    path="/restaurant/food-items"
                    element={
                        <RequireRestaurantAuth redirectTo="/restaurant/login">
                            <RestaurantFoodItems />
                        </RequireRestaurantAuth>
                    }
                />
                <Route
                    path="/all-food-items"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <AllFoodItems />
                        </RequireCustomerAuth>
                    }
                />
                <Route
                    path="/all-restaurants"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <AllRestaurants />
                        </RequireCustomerAuth>
                    }
                />
                <Route
                    path="/customer/mycart"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <MyCart />
                        </RequireCustomerAuth>
                    }
                />
                <Route
                    path="/customer/myorders"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <MyOrders />
                        </RequireCustomerAuth>
                    }
                />
                <Route
                    path="/place-order-form/:id"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <PlaceOrderForm />
                        </RequireCustomerAuth>
                    }
                />
                <Route
                    path="/customer/restaurant/:id"
                    element={
                        <RequireCustomerAuth redirectTo="/customer/login">
                            <Restaurant />
                        </RequireCustomerAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

// base urls
export const baseURL = 'http://localhost:8000';
