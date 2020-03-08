import React from 'react'
import TermsAndConditions from '../../TermsAndConditions.pdf';
import PrivacyPolicy from '../../Farmgate_Ag_Privacy_Policy.pdf';

const Footer = () => {
    return (
        <footer className="mainfooter" role="contentinfo">
  <div className="footer-middle">
  <div className="container">
    <div className="row">      
      	<h4>Follow Us : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <ul className="social-network social-circle">
             <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="myfa fa fa-instagram"></i></a></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <li><a href= "https://www.facebook.com/Farmgate-Market-109209664020278/" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="myfa fa fa-facebook"></i></a></li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* 
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="Linkedin"><i className="myfa fa fa-linkedin"></i></a></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter"><i className="myfa fa fa-twitter"></i></a></li>
            */}
             </ul> 				
		</div>
    <div className="row">
    <a style={{color: '#79bac1'}} href = {TermsAndConditions} target='_blank' rel="noopener noreferrer">Terms and Conditions</a> &nbsp;|&nbsp;
    <a style={{color: '#79bac1'}} href = {PrivacyPolicy} target='_blank' rel="noopener noreferrer">Privacy Policy</a>
    <br/>
    </div>
	<div className="row">
		<div className="col-md-12 copy">
			<p className="text-center">&copy; Copyright {new Date().getFullYear()} - Farmgate Ag |  All rights reserved.</p>
		</div>
	</div>


  </div>
  </div>
</footer>
  
    )
}

export default Footer;
