import React from 'react';
import Carousel1 from '../../images/carousel1.jpg';
import Carousel3 from '../../images/carousel2.jpg';
import { makeStyles } from "@material-ui/core/styles";

const Carousel = () => {
	const styles = useStyles();

    return (
	<div className="carouselmain" style={{backgroundColor: '#fff', padding: '2em'}}>
		<div className="carousel slide" id="main-carousel" data-ride="carousel" data-interval="3000">
			<ol className="carousel-indicators">
				<li data-target="#main-carousel" data-slide-to="0" className="active"></li>
				{/* <li data-target="#main-carousel" data-slide-to="1"></li> */}
				<li data-target="#main-carousel" data-slide-to="2"></li>
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<div>
						<img className={styles.imageResponsive} src={Carousel1} alt="carousel1" />
						<div className="carousel-caption d-md-block">
							<h1 className={styles.heading} >connecting producers to people</h1>
						</div>
					</div>
					
				</div>
				{/* <div className="carousel-item">
					<img className={styles.imageResponsive} src={Carousel1} alt="carousel2" />
					<div className="carousel-caption d-md-block">
						<h1 className={styles.heading} >connecting producers to people</h1>
					</div>
				</div> */}
				<div className="carousel-item">
					<img className={styles.imageResponsive2} src={Carousel3} alt="carousel3" />
					<div className="carousel-caption d-md-block">
						<h1 className={styles.heading}>trace your food.. support local farmers</h1>
					</div>
				</div>
				
			</div>
			
		</div>
        </div>
    )
}

const useStyles = makeStyles({
	heading: {
		marginBottom: '2rem',
		textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', 
		fontSize: '2.5em',
		'@media (max-width: 660px)': {
			fontSize: '1.5em'
		}
	},

	imageResponsive: {
		display: 'block',
		marginLeft: 'auto', 
		marginRight: 'auto', 
		boxShadow: '0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)',
		'@media (min-width: 980px)': {
			width: '40em',
			height:"30em"
		},
		
		'@media (max-width: 660px)': {
			width: '90%',
			height:"18rem"
		}
	},

	imageResponsive2: {
		display: 'block',
		marginLeft: 'auto', 
		marginRight: 'auto', 
		boxShadow: '0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)',
		'@media (min-width: 980px)': {
			width: '45rem',
			height:"30rem"
		},
		
		'@media (max-width: 660px)': {
			width: '100%',
			height:"14rem",
			marginBottom: '3.8rem'
		}
	}
});

export default Carousel;