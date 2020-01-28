import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../userAuth';

const ShopsCard = ({shop}) => {

    const {user} = isAuthenticated();
    let role;
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
                    <h6>Tel. {shop.phoneNumber}</h6> <br/>
                </div>
                <div className="content">
                <p>{shop.description.substring(0,150)}...</p>
                {role!== undefined && role === 0 &&
                <button className="btn btn-warning"><Link to ={`/shops/${shop._id}`} >Order Now</Link></button>}
                {role!== undefined && role === 1 &&
                <button className="btn btn-warning"><Link to ={`/admin/shops/${shop._id}`} >Edit Now</Link></button>}
                {role === undefined &&
                <button className="btn btn-warning"><Link to ={`/shops/${shop._id}`} >Order Now</Link></button>}

                </div>
                </div>
            </div>
          </Fragment>
    )
}

export default ShopsCard;
