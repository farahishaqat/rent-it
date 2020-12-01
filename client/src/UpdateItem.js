import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const UpdateItem = (props) => {
    const [state, setState] = useState({
        itemName: '',
        itemDescription: '',
        slug: '',
        user: ''
    });
    const { itemName, itemDescription, slug, user } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/item/${props.match.params.slug}`)
            .then(response => {
                const { itemName, itemDescription, slug, user } = response.data;
                setState({ ...state, itemName, itemDescription, slug, user });
            })
            .catch(error => alert('Error loading item'));
             // eslint-disable-next-line
    },[]);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ itemName, itemDescription, user });
        axios
            .put(`${process.env.REACT_APP_API}/item/${slug}`, { itemName, itemDescription, user })
            .then(response => {
                console.log(response);
                const { itemName, itemDescription, slug, user } = response.data;
                // empty state
                setState({ ...state, itemName, itemDescription, slug, user });
                // show sucess alert
                alert(`Item Named ${itemName} is Edited`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted"> Item Name </label>
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
                <label className="text-muted">Item Description</label>
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
                <button className="btn btn-primary">Edit</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1> EDIT ITEM </h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdateItem;
