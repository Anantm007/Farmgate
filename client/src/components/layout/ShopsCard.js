import React, {Fragment} from 'react';

const ShopsCard = ({shop}) => {
    return (
          <Fragment>
            <section id="team" className="pb-5">
                <div className="container">
                    <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                              <div className="frontside">
                                  <div className="card" style={{backgroundColor: '#f5eaea'}}>
                                          <div className="card-body text-center">
                                              <p><img className=" img-fluid" src={`/api/shops/photo/${shop._id}`} alt="card image" /></p>
                                              <h4 className="card-title">{shop.name}</h4>
                                              <p className="card-text">{shop.address}</p>      
                                          </div>
                                    </div>
                              </div>
                              
                              <div className="backside">
                                  <div className="card"  style={{backgroundColor: '#f5eaea'}}>
                                        <div className="card-body text-center mt-4">
                                            <p className="card-text">{shop.description.substring(0,200)} ...</p><br/>
                                            <a href={`/shops/${shop._id}`} style={{color: "black"}}><button className="btn btn-primary">ORDER NOW</button></a>    
                                        </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </section>
        </Fragment>
    )
}

export default ShopsCard;
