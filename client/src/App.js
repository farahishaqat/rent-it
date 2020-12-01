import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
    const [items, setItems] = useState([]);

    const fetchItems = () => {
        axios
            .get(`${process.env.REACT_APP_API}/items`)
            .then(response => {
                // console.log(response);
                setItems(response.data);
            })
            .catch(error => alert('Error fetching items'));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to rent this Item?');
        if (answer) {
            deleteItem(slug);
        }
    };

    const deleteItem = slug => {
        // console.log('delete', slug, ' item');
        axios
            .delete(`${process.env.REACT_APP_API}/item/${slug}`)
            .then(response => {
                alert(response.data.message);
                fetchItems();
            })
            .catch(error => alert('Error renting this Item'));
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h4> Why Buy It? when you can</h4>
            <h1> RENT IT </h1>
            <hr />
            {items.map((item, i) => (
                <div className="row" key={item._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-10">
                                <Link to={`/item/${item.slug}`}>
                                    <h2>{item.itemName}</h2>
                                </Link>
                                <p className="lead">{item.itemDescription.substring(0, 100)}</p>
                                <p>
                                    Owner <span className="badge">{item.user}</span> Published on{' '}
                                    <span className="badge">{new Date(item.createdAt).toLocaleString()}</span>
                                </p>
                            </div>

                            <div className="col-md-2">
                                <Link to={`/item/update/${item.slug}`} className="btn btn-sm btn-outline-warning">
                                    Update
                                </Link>
                                <button
                                    onClick={() => deleteConfirm(item.slug)}
                                    className="btn btn-sm btn-outline-danger ml-1"
                                >
                                    Rent it
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
