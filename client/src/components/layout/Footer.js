import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mainfooter" role="contentinfo">
  <div className="footer-middle">
  <div className="container">
    <div className="row">      
      	<h4>Follow Us : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <ul className="social-network social-circle">
             <li><a href= "https://facebook.com" target="_blank" title="Facebook"><i className="fab fa-facebook"></i></a></li>
             <li><a href="https://instagram.com" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
             <li><a href="https://linkedin.com" target="_blank" title="Linkedin"><i className="fab fa-linkedin"></i></a></li>
             <li><a href="https://twitter.com" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>
            </ul>				
		</div>
	<div className="row">
		<div className="col-md-12 copy">
			<p className="text-center">&copy; Copyright {new Date().getFullYear()} - Farmgate Market |  All rights reserved.</p>
		</div>
	</div>


  </div>
  </div>
</footer>
  
    )
}

export default Footer;
