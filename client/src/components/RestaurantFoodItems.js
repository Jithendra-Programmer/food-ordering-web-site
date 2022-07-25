// importing packages
import { useEffect, useState, useRef } from 'react';

// importing css
import { MdDelete, MdEdit } from 'react-icons/md';

// importing Components
import { RestaurantNav } from './layouts/Nav';

// importing css
import './styles/restaurantDashboard.css';

// importing baseURL
import { baseURL } from '../App';

// restaurant food items Component
function RestaurantFoodItems() {
    // state variables
    const [foodItems, setFoodItems] = useState([]);
    const [foodItemToUpdate, setFoodItemToUpdate] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });
    const [addFoodItemFormModelStyle, setAddFoodItemFormModelStyle] = useState({
        visibility: 'hidden',
        opacity: 0,
    });
    const [addFoodItemFormStyle, setAddFoodItemFormStyle] = useState({
        visibility: 'hidden',
        opacity: 0,
        marginTop: '-10vh',
        transform: 'scale(1.8)',
    });

    const [updateFoodItemFormModelStyle, setUpdateFoodItemFormModelStyle] =
        useState({
            visibility: 'hidden',
            opacity: 0,
        });

    const [updateFoodItemFormStyle, setUpdateFoodItemFormStyle] = useState({
        visibility: 'hidden',
        opacity: 0,
        marginTop: '-10vh',
        transform: 'scale(1.8)',
    });

    // user data
    let token = useRef(JSON.parse(localStorage.getItem('userDetails')).token);
    let restaurant = useRef(
        JSON.parse(localStorage.getItem('userDetails')).user,
    );

    const newFormData = new FormData();
    const updatedFoodImage = new FormData();

    // function to read value from input
    const readValue = (property, value) => newFormData.append(property, value);

    // function to open form
    const openAddFoodItemForm = () => {
        setAddFoodItemFormStyle({
            visibility: 'visible',
            opacity: 1,
            marginTop: '30px',
            transform: 'scale(1)',
        });
        setAddFoodItemFormModelStyle({ visibility: 'visible', opacity: 1 });
    };

    // function to close form
    const closeAddFoodItemForm = () => {
        setAddFoodItemFormModelStyle({ visibility: 'hidden', opacity: 0 });
        setAddFoodItemFormStyle({
            visibility: 'hidden',
            opacity: 0,
            marginTop: '-10vh',
            transform: 'scale(2)',
        });
    };

    // function to open form
    const openUpdateFoodItemForm = () => {
        setUpdateFoodItemFormStyle({
            visibility: 'visible',
            opacity: 1,
            marginTop: '30px',
            transform: 'scale(1)',
        });
        setUpdateFoodItemFormModelStyle({ visibility: 'visible', opacity: 1 });
    };

    // function to close form
    const closeUpdateFoodItemForm = () => {
        setUpdateFoodItemFormModelStyle({ visibility: 'hidden', opacity: 0 });
        setUpdateFoodItemFormStyle({
            visibility: 'hidden',
            opacity: 0,
            marginTop: '-10vh',
            transform: 'scale(2)',
        });
    };

    useEffect(() => {
        // fetch all food items
        fetch(`${baseURL}/restaurant/fooditems/${restaurant.current._id}`, {
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setFoodItems(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    // function to create food item
    const createFoodItem = () => {
        newFormData.append('restaurant', restaurant.current._id);

        fetch(`${baseURL}/food/createItem`, {
            method: 'POST',
            body: newFormData,
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                let foodItem = data.foodItem;
                let tempFoodItems = [...foodItems];
                tempFoodItems.push(foodItem);
                setFoodItems(tempFoodItems);
                closeAddFoodItemForm();
            })
            .catch((err) => console.log(err));
    };

    // function to delete food item
    const deleteFoodItem = (id, index) => {
        fetch(`${baseURL}/food/deleteItem/${id}`, {
            method: 'DELETE',
            headers: { authorization: `bearer ${token.current}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                let tempFoodItems = [...foodItems];

                tempFoodItems.splice(index, 1);

                setFoodItems(tempFoodItems);
            })
            .catch((err) => console.log(err));
    };

    // function to read value from input
    const readUpdateValue = (property, value) => {
        let tempData = { ...foodItemToUpdate };
        tempData[property] = value;
        setFoodItemToUpdate(tempData);
    };

    // function to update food item
    const updateFoodItem = () => {
        // console.log(foodItemToUpdate._id);
        // console.log(token.current);

        fetch(`${baseURL}/food/updateItem/${foodItemToUpdate._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${token.current}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(foodItemToUpdate),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log('Hello');
                    if (updatedFoodImage.get('image') !== null) {
                        fetch(
                            `${baseURL}/food/updateFoodImage/${foodItemToUpdate._id}`,
                            {
                                method: 'PUT',
                                headers: {
                                    authorization: `bearer ${token.current}`,
                                },
                                body: updatedFoodImage,
                            },
                        )
                            .then((res) => res.json())
                            .then((response) => {
                                if (response.success) {
                                    let tempFoodItems = [...foodItems];
                                    let index = tempFoodItems.findIndex(
                                        (foodItem) =>
                                            foodItem._id ===
                                            foodItemToUpdate._id,
                                    );
                                    tempFoodItems[index] = foodItemToUpdate;
                                    tempFoodItems[index].pic =
                                        response.fileName;
                                    // console.log(response.fileName);
                                    setFoodItems(tempFoodItems);
                                    closeUpdateFoodItemForm();
                                }
                            })
                            .catch((err) => console.log(err));
                    } else {
                        let tempFoodItems = [...foodItems];
                        let index = tempFoodItems.findIndex(
                            (foodItem) => foodItem._id === foodItemToUpdate._id,
                        );
                        tempFoodItems[index] = foodItemToUpdate;
                        setFoodItems(tempFoodItems);
                        closeUpdateFoodItemForm();
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    // function to get food item to update
    const getFoodItemToUpdate = (index) => {
        let foodItem = foodItems[index];
        setFoodItemToUpdate(foodItem);
        openUpdateFoodItemForm();
    };

    return (
        <div className="restaurant-dashboard">
            {/* add food item form */}

            <div
                onClick={(event) => {
                    if (event.target.className === 'form-model') {
                        closeAddFoodItemForm();
                    }
                }}
                className="form-model"
                style={addFoodItemFormModelStyle}
            >
                {/* Form to add the food Item */}
                <div
                    style={addFoodItemFormStyle}
                    className="form-container container"
                >
                    <h1 className="title" style={{ textAlign: 'center' }}>
                        Add Food Item
                    </h1>
                    <form
                        className="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            createFoodItem();
                        }}
                    >
                        <input
                            onChange={(event) =>
                                readValue('name', event.target.value)
                            }
                            className="input-feild"
                            type="text"
                            placeholder="Enter Food name"
                            required
                        />

                        <div
                            style={{
                                display: 'flex',
                                width: '42vw',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '48%',
                                }}
                            >
                                <label>Quantity</label>
                                <input
                                    onChange={(event) =>
                                        readValue(
                                            'quantity',
                                            event.target.value,
                                        )
                                    }
                                    style={{ width: '100%' }}
                                    className="input-feild"
                                    type="number"
                                    placeholder="Enter Quantity"
                                    required
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '48%',
                                }}
                            >
                                <label>Price</label>
                                <input
                                    onChange={(event) =>
                                        readValue('price', event.target.value)
                                    }
                                    style={{ width: '100%' }}
                                    className="input-feild"
                                    type="number"
                                    placeholder="Enter Price"
                                    required
                                />
                            </div>
                        </div>

                        <textarea
                            minLength="10"
                            onChange={(event) =>
                                readValue('description', event.target.value)
                            }
                            className="input-feild"
                            type="text"
                            placeholder="Enter Description"
                            required
                        />
                        <input
                            name="image"
                            onChange={(event) =>
                                readValue('image', event.target.files[0])
                            }
                            style={{ border: 'none', boxShadow: 'none' }}
                            className="input-feild"
                            type="file"
                            placeholder="choose Image"
                            required
                        />
                        <button type="submit" className="btn">
                            Add Food Item
                        </button>
                    </form>
                </div>

                <button onClick={closeAddFoodItemForm} className="close-btn">
                    X
                </button>
            </div>

            {/* update food item form */}

            <div
                onClick={(event) => {
                    if (event.target.className === 'form-model') {
                        closeUpdateFoodItemForm();
                    }
                }}
                className="form-model"
                style={updateFoodItemFormModelStyle}
            >
                <div
                    style={updateFoodItemFormStyle}
                    className="form-container container"
                >
                    <h1 className="title" style={{ textAlign: 'center' }}>
                        Update Food Item
                    </h1>
                    <form
                        className="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            updateFoodItem();
                        }}
                    >
                        <input
                            value={foodItemToUpdate['name']}
                            onChange={(event) =>
                                readUpdateValue('name', event.target.value)
                            }
                            className="input-feild"
                            type="text"
                            placeholder="Enter Food name"
                            required
                        />

                        <div
                            style={{
                                display: 'flex',
                                width: '42vw',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '48%',
                                }}
                            >
                                <label>Quantity</label>
                                <input
                                    value={foodItemToUpdate['quantity']}
                                    onChange={(event) =>
                                        readUpdateValue(
                                            'quantity',
                                            event.target.value,
                                        )
                                    }
                                    style={{ width: '100%' }}
                                    className="input-feild"
                                    type="number"
                                    placeholder="Enter Quantity"
                                    required
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '48%',
                                }}
                            >
                                <label>Price</label>
                                <input
                                    value={foodItemToUpdate.price}
                                    onChange={(event) =>
                                        readUpdateValue(
                                            'price',
                                            event.target.value,
                                        )
                                    }
                                    style={{ width: '100%' }}
                                    className="input-feild"
                                    type="number"
                                    placeholder="Enter Price"
                                    required
                                />
                            </div>
                        </div>

                        <textarea
                            value={foodItemToUpdate.description}
                            onChange={(event) =>
                                readUpdateValue(
                                    'description',
                                    event.target.value,
                                )
                            }
                            className="input-feild"
                            type="text"
                            placeholder="Enter Description"
                            required
                        />
                        <input
                            type="file"
                            className="input-feild"
                            placeholder="upload image"
                            style={{ border: 'none' }}
                            onChange={(event) =>
                                updatedFoodImage.append(
                                    'image',
                                    event.target.files[0],
                                )
                            }
                        />
                        <button type="submit" className="btn">
                            Update
                        </button>
                    </form>
                </div>

                <button onClick={closeUpdateFoodItemForm} className="close-btn">
                    X
                </button>
            </div>

            {/* nav bar */}
            <RestaurantNav />

            <section className="container">
                {/* header */}
                <header className="title-container">
                    <h1 className="title">Food Items</h1>

                    <button onClick={openAddFoodItemForm} className="btn">
                        Add Item
                    </button>
                </header>

                {/* food items */}
                <main className="food-items-container">
                    {foodItems.length === 0 ? (
                        <h1 className="title">No Food Items Found</h1>
                    ) : (
                        foodItems.map((foodItem, key) => (
                            <div key={key} className="food-item">
                                <div className="btn-container">
                                    <button
                                        onClick={() => getFoodItemToUpdate(key)}
                                        className="update-btn"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteFoodItem(foodItem._id, key)
                                        }
                                        className="delete-btn"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>

                                <img
                                    src={`${baseURL}/food/image/${foodItem.pic}`}
                                    className="food-item-image"
                                    alt="Food Item Pic"
                                />

                                <div className="food-item-details">
                                    <h1 className="title">{foodItem.name}</h1>

                                    <p className="desc">
                                        {foodItem.description}
                                    </p>

                                    <div className="price-quantity-container">
                                        <div style={{ width: '50%' }}>
                                            <h5>Price: </h5>
                                            <p>&#8377; {foodItem.price}</p>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <h5>Quantity: </h5>
                                            <p>{foodItem.quantity} left</p>
                                        </div>
                                    </div>

                                    <div className="mob-btn-container">
                                        <button
                                            onClick={() =>
                                                getFoodItemToUpdate(key)
                                            }
                                            className="update-btn"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteFoodItem(
                                                    foodItem._id,
                                                    key,
                                                )
                                            }
                                            className="delete-btn"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </section>
        </div>
    );
}

export default RestaurantFoodItems;
