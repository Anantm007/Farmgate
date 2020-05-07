import React from 'react';
import Carousel1 from '../../images/carousel1.jpg';
import Carousel2 from '../../images/carousel2.jpg';
import Carousel3 from '../../images/carousel3.jpg';

const Carousel = () => {
    return (
	<div className="carouselmain" style={{background: 'linear-gradient(#649d66, #639a67)', padding: '2em'}}>
		<div className="carousel slide" id="main-carousel" data-ride="carousel" data-interval="3000">
			<ol className="carousel-indicators">
				<li data-target="#main-carousel" data-slide-to="0" className="active"></li>
				<li data-target="#main-carousel" data-slide-to="1"></li>
				<li data-target="#main-carousel" data-slide-to="2"></li>
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="d-block img-fluid" style={{height:"25rem", width:"80%", marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '80%', boxShadow: '0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)'}} src={Carousel1} alt="carousel1" />
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid" style={{height:"25rem", width:"80%", marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '80%', boxShadow: '0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)'}} src={Carousel2} alt="carousel2" />
					<div className="carousel-caption d-md-block">
						<h1 style={{marginBottom: '8rem'}}>connecting producers to people</h1>
					</div>
				</div>
				<div className="carousel-item">
					<img className="d-block img-fluid " style={{height:"25rem", width:"80%", marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '80%', boxShadow: '0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)'}} src={Carousel3} alt="carousel3" />
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