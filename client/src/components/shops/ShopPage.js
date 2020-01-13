import React, {Fragment} from 'react'

const ShopPage = () => {
    return (
        <Fragment>
        <div class="container">

        <div class="row">
    
          <div class="col-lg-3">
    
            <h1 class="my-4">Shop Name</h1>
            <div>
              <a href="#" class="">Shop Address</a> <br/>
              <a href="#" class="">Phone</a><br/>
              <a href="#" class="">Email</a><br/>
            </div>
    
          </div>
    
          <div class="col-lg-9">
    
            <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide" />
                </div>
                </div>
              
            </div>
    
            <div class="row">
    
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                  <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">Item One</a>
                    </h4>
                    <h5>$24.99</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                  </div>
                </div>
              </div>
    
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                  <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">Item Two</a>
                    </h4>
                    <h5>$24.99</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                  </div>
                </div>
              </div>
    
              
            </div>
    
          </div>
    
        </div>
    
      </div>
      </Fragment>
    )
}

export default ShopPage
