import React, { Fragment } from 'react'

const ShopItems = ({item}) => {
    return (
        <Fragment>
            
            <div class="row">
                
                <div class="flip-card" style={{margin: "2rem"}}>
                    <div class="flip-card-inner">
                        
                        <div class="flip-card-front">
                        <img src="https://lh3.googleusercontent.com/OQZi4ckWAs7UrOlZEPefXZgJOcdJuSM5FSH9zqD5rMg6c2MOaxcKpV5IMrb1Tju98fWyNmcI33E4RGb0uC09Ej4W" style={{height:"10rem"}} />
                        <h4>Item Name</h4>
                        <h6>Item quality</h6>
                        </div>

                        <div class="flip-card-back">
                        <h5>Item description</h5>
                        <strong>Item quality</strong>
                        <br/>
                        <button className="btn btn-warning">Add to cart</button>
                        </div>
                        
                    </div>
                </div>

            </div>
        
        </Fragment>
  )
}

export default ShopItems
