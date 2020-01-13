import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ShopsCard = ({shop}) => {
    return (
          <Fragment>
            <div class="card">
                <div class="image">
                <img src={`/api/shops/photo/${shop._id}`} />
                </div>
                <div class="card-inner">
                <div class="header">
                    <h2>{shop.name}</h2> <br/>
                    <h6>{shop.address}</h6>
                    <h6>Tel. {shop.phoneNumber}</h6> <br/>
                </div>
                <div class="content">
                <p>{shop.description.substring(0,150)}...</p>
                <button className="btn btn-warning"><Link to ={`/shops/${shop._id}`} >Order Now</Link></button>
                </div>
                </div>
            </div>
/* ITEMS, AVERAGE PRICE */
          </Fragment>
    )
}

export default ShopsCard;
