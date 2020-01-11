import React, {Fragment} from 'react';
import Carousel1 from '../../images/carousel1.jpeg';
import Carousel2 from '../../images/carousel2.jpg';
import Carousel3 from '../../images/carousel3.jpg';

const Carousel = () => {
    return (
	<div className="carouselmain">
		<div className="carousel slide" id="main-carousel" data-ride="carousel">
			<ol className="carousel-indicators">
				<li data-target="#main-carousel" data-slide-to="0" className="active"></li>
				<li data-target="#main-carousel" data-slide-to="1"></li>
				<li data-target="#main-carousel" data-slide-to="2"></li>
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="d-block img-fluid" style={{height:"30rem", width:"100%"}} src={Carousel1} alt="" />
					<div className="carousel-caption d-md-block">
						<h2>Buy Fresh Organic Food</h2>
					</div>
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid" style={{height:"30rem", width:"100%"}} src={Carousel2} alt="" />
					<div className="carousel-caption d-md-block">
						<h2>Best Stores In Adelaide</h2>
					</div>
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid " style={{height:"30rem", width:"100%"}} src={Carousel3} alt="" />
					<div className="carousel-caption d-md-block">
						<h2>Affordable Rates And Fast Delivery</h2>
					</div>
				</div>
				
			</div>
			
		</div>
        </div>
    )
}

export default Carousel;