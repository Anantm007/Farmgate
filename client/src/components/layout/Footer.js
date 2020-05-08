import React from 'react'
import TermsAndConditions from '../../TermsAndConditions.pdf';
import PrivacyPolicy from '../../Farmgate_Ag_Privacy_Policy.pdf';
import Sitemap from '../../Farmgate_Sitemap.xml';
import { makeStyles } from "@material-ui/core/styles";

const Footer = () => {
  const styles = useStyles();

    return (
        <footer className="mainfooter" role="contentinfo">
  <div className="footer-middle"  style={{backgroundColor: '#649d66'}}>
  <div className="container">
    <div className="row">      
      	<h4 className={styles.header}>Follow Us :</h4>
            <ul className="social-network social-circle">
              <li><a href="https://www.instagram.com/far.gate.market/" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="myfa fa fa-instagram"></i></a></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li><a href= "https://www.facebook.com/Farmgate-Market-109209664020278" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="myfa fa fa-facebook"></i></a></li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             </ul> 				
		</div>
    <div className="row">
    <a className={styles.footerText} href = {TermsAndConditions} target='_blank' rel="noopener noreferrer">Terms and Conditions</a> &nbsp;|&nbsp;
    <a className={styles.footerText} href = {PrivacyPolicy} target='_blank' rel="noopener noreferrer">Privacy Policy</a> &nbsp;|&nbsp;
    <a className={styles.footerText} href = {Sitemap} target='_blank' rel="noopener noreferrer">Sitemap</a>
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


const useStyles = makeStyles({
  header: {
    marginLeft: '.7em',
    marginRight: '2em'
  },

  footerText: {
    color: '#142850', 
    fontSize: '1.1em',
    marginLeft: '1em',
    marginRight: '1em'
  }
});

export default Footer;
