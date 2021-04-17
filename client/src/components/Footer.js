import React from 'react';
import './styles/Footer.css';
import {Link} from 'react-router-dom'

const Footer = () => {
	return (
    <div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><Link to="#">Web design</Link></li>
                            <li><Link to="#">Development</Link></li>
                            <li><Link to="#">Hosting</Link></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><Link to="#">Company</Link></li>
                            <li><Link to="#">Team</Link></li>
                            <li><Link to="#">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6 item text">
                        <h3>EvoBooks</h3>
                        <p>Great selection of modern and classic books waiting to be discovered. All free and available in most ereader formats.</p>
                    </div>
                    <div className="col item social"><Link to="#"><i className="fab fa-facebook-square"></i></Link><Link to="#"><i className="fab fa-twitter"></i></Link><Link to="#"><i className="fab fa-youtube"></i></Link><Link to="#"><i className="fab fa-instagram"></i></Link></div>
                </div>
                <p className="copyright">Copyrights EvoBooks © {new Date().getFullYear()}</p>
            </div>
        </footer>
    </div>
	)
}

export default Footer