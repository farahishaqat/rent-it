import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav'

const Create = () => {
    // state
    const [state, setState] = useState({
        itemName: '',
        itemDescription: '',
        user: ''
    });
    // destructure values from state
    const { itemName, itemDescription, user } = state;

    // onchange event handler
    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value});
        };
    }

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ itemName, ItemDescription, user });
        axios
            .post(`${process.env.REACT_APP_API}/item`, { itemName, itemDescription, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, itemName: '', itemDescription: '', user: '' });
                // show sucess alert
                alert(`Item Name ${response.data.itemName} is Added`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <h1> ADD RENTALS </h1>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Item Name</label>
                    <input
                        onChange={handleChange('itemName')}
                        value={itemName}
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Item Description </label>
                    <textarea
                        onChange={handleChange('itemDescription')}
                        value={itemDescription}
                        type="text"
                        className="form-control"
                        placeholder="Write something about the item you want to let .."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary"> ADD </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
