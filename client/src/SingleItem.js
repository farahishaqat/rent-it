import React ,{ useEffect, useState } from 'react';
import axios from 'axios'
import Nav from './Nav'

const SingleItem = props=>{
    const [ item,setItem] = useState('')

    
    useEffect(()=>{
       
        axios
        .get(`${process.env.REACT_APP_API}/item/${props.match.params.slug}`)
        .then(response => setItem(response.data))
        .catch(error => alert('Error loading item'));
        // eslint-disable-next-line 
    },[]);


    return(
        <div className="container pb-5">
          <Nav/>
          <br/>
          <h1>{item.itemName}</h1>
           <p className="lead"> {item.itemDescription} </p>
           <p>
             Owner <span className="badge"> {item.user} </span> Published on{''}
             <span className="badge">{new Date(item.createdAt).toLocaleString()} </span>
           </p>
        </div>
    );

};

export default SingleItem;