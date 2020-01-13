import React, {Fragment} from 'react';

const ShopsCard = ({shop}) => {
    return (
          <Fragment>
            
            <div className="card card-block">
              <img src={`/api/shops/photo/${shop._id}`} className="card-img-top"   data-holder-rendered="true" style={{height: '180px', width: '100%', display: 'block'}} />
              <div className="card-block">
                <h4 className="card-title">{shop.name}</h4>
                <p className="card-text">{shop.description.substring(0,100)}</p>
                <a href="#" className="btn btn-primary">ORDER NOW</a>
              </div>
            </div>
          </Fragment>
    )
}

export default ShopsCard;
