import React, {Fragment} from 'react';
import Carousel from './Carousel';
import ShopsCard from './ShopsCard'
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

const Landing = () => {
    return (
        <Fragment>
            <Carousel />
            <h1 style={{textAlign:'center', marginTop: '4rem'}}>OUR SHOPS</h1>
            <ShopsCard />
            <AboutUs />
            <ContactUs />
        </Fragment>
    )
}

export default Landing
