import React, {Fragment} from 'react';
import Logo from "../../images/logo.png";
import Carousel from './Carousel';
const Landing = () => {
    return (
        <Fragment>
            <Carousel />
            <h1 style={{textAlign:'center', marginTop: '2rem'}}>OUR SHOPS</h1>
        </Fragment>
    )
}

export default Landing
