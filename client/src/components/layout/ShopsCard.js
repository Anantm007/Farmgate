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
              <img src="data:image/jpeg;base64,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" className="card-img-top"  style={{height: '180px', width: '100%', display: 'block'}} />
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
