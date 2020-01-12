import React, {Fragment} from 'react';
import Logo from "../../images/logo.png";
import Carousel from './Carousel';
import AboutUs from './AboutUs';
import ShopsCard from './ShopsCard'
const Landing = () => {
    return (
        <Fragment>
            <Carousel />
            <h1 style={{textAlign:'center', marginTop: '4rem'}}>OUR SHOPS</h1>
            <ShopsCard />
            <AboutUs />
        </Fragment>
    )
}

export default Landing
