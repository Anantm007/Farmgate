import React from 'react';
import Carousel1 from '../../images/carousel1.jpg';
import Carousel2 from '../../images/carousel2.jpg';
import Carousel3 from '../../images/carousel3.jpg';

const Carousel = () => {
    return (
	<div className="carouselmain">
		<div className="carousel slide" id="main-carousel" data-ride="carousel" data-interval="3000">
			<ol className="carousel-indicators">
				<li data-target="#main-carousel" data-slide-to="0" className="active"></li>
				<li data-target="#main-carousel" data-slide-to="1"></li>
				<li data-target="#main-carousel" data-slide-to="2"></li>
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="d-block img-fluid" style={{height:"35rem", width:"100%"}} src={Carousel1} alt="carousel1" />
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid" style={{height:"35rem", width:"100%"}} src={Carousel2} alt="carousel2" />
					<div className="carousel-caption d-md-block">
						<h1 style={{marginBottom: '10rem'}}>connecting producers to people</h1>
					</div>
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid " style={{height:"35rem", width:"100%"}} src={Carousel3} alt="carousel3" />
					<div className="carousel-caption d-md-block">
						<h1 style={{marginBottom: '2rem'}}>trace your food… support local farmers</h1>
					</div>
				</div>
				
			</div>
			
		</div>
        </div>
    )
}

export default Carousel;