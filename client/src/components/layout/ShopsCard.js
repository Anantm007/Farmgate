import React from 'react';

const ShopsCard = () => {
    return (
        <div className="row shop-container container-fluid">

          <div className="col-sm-3">
            <div className="card card-block">
              <img src="https://storage.googleapis.com/um-editorial-shared-content/1/2017/07/@asnatureintended.jpg" className="card-img-top"   data-holder-rendered="true" style={{height: '180px', width: '100%', display: 'block'}} />
              <div className="card-block">
                <h4 className="card-title">Shop 1</h4>
                <p className="card-text">We deliver the best fruits ike apple, orange, bananas at cheap rates</p>
                <a href="#" className="btn btn-primary">ORDER NOW</a>
              </div>
            </div>
          </div>
          
          <div className="col-sm-3">
            <div className="card card-block">
              <img src="https://cdn2.stylecraze.com/wp-content/uploads/2014/08/2023_Top-10-Organic-Food-Stores-In-Chennai_iS.jpg" className="card-img-top"  style={{height: '180px', width: '100%', display: 'block'}} />
              <div className="card-block">
                <h4 className="card-title">Shop 2</h4>
                <p className="card-text">We deliver the most fresh and healthy vegetables to our customers</p>
                <a href="#" className="btn btn-primary">ORDER NOW</a>
              </div>  
            </div>       
          </div> 

          <div className="col-sm-3">
            <div className="card card-block">
              <img src="https://www.thebalancesmb.com/thmb/n9D6Qq1PX8P3s-78NzMoN6vGGLE=/5100x2869/smart/filters:no_upscale()/organic-produce-aisle-in-supermarket-76534064-3a3d2b73cad5470c8840e64044b1d97f.jpg" className="card-img-top"  style={{height: '180px', width: '100%', display: 'block'}} />
              <div className="card-block">
                <h4 className="card-title">Shop 3</h4>
                <p className="card-text">We specialize in delivering green leafy vegetables to our customers</p>
                <a href="#" className="btn btn-primary">ORDER NOW</a>
              </div>  
            </div>       

          </div> 
          <div className="col-sm-3">
            <div className="card card-block">
              <img src="https://www.thebalancesmb.com/thmb/n9D6Qq1PX8P3s-78NzMoN6vGGLE=/5100x2869/smart/filters:no_upscale()/organic-produce-aisle-in-supermarket-76534064-3a3d2b73cad5470c8840e64044b1d97f.jpg" className="card-img-top"  style={{height: '180px', width: '100%', display: 'block'}} />
              <div className="card-block">
                <h4 className="card-title">Shop 4</h4>
                <p className="card-text">We are a speical group delivering and researching about peas</p>
                <a href="#" className="btn btn-primary">ORDER NOW</a>
              </div>  
            </div>       
          </div>        
  
        </div>
    )
}

export default ShopsCard;
