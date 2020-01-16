import React, { Fragment } from 'react'

const ShopItems = ({item}) => {
    return (
        <Fragment>
            
            <div class="row">
                
                <div class="flip-card" style={{margin: "2rem"}}>
                    <div class="flip-card-inner" style={{backgroundImage: `url(/api/items/photo/${item._id}`}}>
                        
                        <div class="flip-card-front">
                        <h4>{item.name}</h4>
                        <h6>{`$ ${item.price} / ${item.variant}`}</h6>
                        {item.inStock ? <span className="badge badge-primary badge-pill">In Stock</span> : <span className="badge badge-danger badge-pill">Out of Stock</span>} <br/><br/>
                        {item.inStock && <button className="btn btn-danger">Add to Cart</button>}
                        </div>

                        <div class="flip-card-back">
                        <p>{item.description}</p>
                        <span className="badge badge-success badge-pill">{item.quality}</span><br/><br/>
                        {item.inStock && <button className="btn btn-danger">Add to Cart</button>}
                        </div>
                        
                    </div>
                </div>

            </div>
        
        </Fragment>
  )
}

export default ShopItems
