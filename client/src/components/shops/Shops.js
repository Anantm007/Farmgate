import React, {Fragment} from 'react'
import  {Link} from 'react-router-dom';

const Shops = () => {
    const id=100000000;
    return (
        <Fragment>
            <div className="row container-fluid">
            <div class="col-sm-4">
                <div class="card">
                    <div class="image">
                    <img src="http://loremflickr.com/320/150?random=4" />
                    </div>
                    <div class="card-inner">
                    <div class="header">
                        <h2>Shop1</h2>
                        <h3>Address</h3>
                    </div>
                    <div class="content">
                    <p>Content area</p>
                    <button className="btn btn-warning"><Link to ={`/shops/${id}`} >Order Now</Link></button>
                    </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
            <div class="card">
                <div class="image">
                <img src="http://loremflickr.com/320/150?random=5" />
                </div>
                <div class="card-inner">
                <div class="header">
                    <h2>Shop2</h2>
                    <h3>Address</h3>
                </div>
                <div class="content">
                <p>Content area</p>
                <button className="btn btn-warning"><Link to ={`/shops/${id}`} >Order Now</Link></button>
                </div>
                </div>
            </div>
            </div>

            <div class="col-sm-4">
            <div class="card">
                <div class="image">
                <img src="http://loremflickr.com/320/150?random=6" />
                </div>
                <div class="card-inner">
                <div class="header">
                    <h2>Shop 3</h2>
                    <h3>Address</h3>
                </div>
                <div class="content">
                <p>Content area</p>
                <button className="btn btn-warning"><Link to ={`/shops/${id}`} >Order Now</Link></button>
                </div>
                </div>
            </div>
            </div>
            
            <div class="col-sm-4">
            <div class="card">
                <div class="image">
                <img src="http://loremflickr.com/320/150?random=2" />
                </div>
                <div class="card-inner">
                <div class="header">
                    <h2>Shop 4</h2>
                    <h3>Address</h3>
                </div>
                <div class="content">
                <p>Content area</p>
                <button className="btn btn-warning"><Link to ={`/shops/${id}`} >Order Now</Link></button>
                </div>
                </div>
            </div>

            </div>
        </div>
</Fragment>
    )
}

export default Shops
