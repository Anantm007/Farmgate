import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../userAuth';
import {countItems} from './apiShops';

const ShopsCard = ({shop}) => {

    const [noOfItems, setNoOfItems] = useState(0)
    const {user} = isAuthenticated();
    let role;

    const CountItems = () => {
        countItems(shop._id).then(data => {
            console.log(data)
            if(data.success === true)
            setNoOfItems(data.data);
        })
    }

    useEffect(() => {
        CountItems()
        //eslint-disable-next-line
    }, [])

    if(user)
    {
        role = user.role;
    }

    return (
          <Fragment>
            <div className="card">
                <div className="image">
                <img src={`/api/shops/photo/${shop._id}`} alt="" />
                </div>
                <div className="card-inner">
                <div className="header">
                    <h2>{shop.name}</h2> <br/>
                    <h6>{shop.address}</h6>
                    <h6>Items Available: {noOfItems}</h6> <br/>
                </div>
                <div className="content">
                <p>{shop.description.substring(0,150)}...</p>
                {role!== undefined && role === 0 &&
                <button className="btn btn-primary" style={{backgroundColor: '#0000FF'}}><Link to ={`/shops/${shop._id}`} style={{color: 'white'}} >Order Now</Link></button>}
                {role!== undefined && role === 1 &&
                <button className="btn btn-warning"><Link to ={`/admin/shops/${shop._id}`} >Edit Now</Link></button>}
                {role === undefined &&
                <button className="btn btn-primary" style={{backgroundColor: '#0000FF'}}><Link to ={`/shops/${shop._id}`} style={{color: 'white'}}>Order Now</Link></button>}

                </div>
                </div>
            </div>
          </Fragment>
    )
}

export default ShopsCard;
