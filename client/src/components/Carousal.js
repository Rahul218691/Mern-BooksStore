import React from 'react'
import './styles/Carousal.css';


const Carousal = () => {
	return (
		<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
			  <ol className="carousel-indicators">
			    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
			    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
			    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
			  </ol>
			  <div className="carousel-inner">
			    <div className="carousel-item active">
			      <img src="https://manybooks.net/sites/default/files/2018-07/bookdisplaysmall.jpg" className="d-block w-100 imgCarousal" alt="" style={{height:'534px'}}/>
			      <div className="carousel-caption  d-md-block">
			        <h6>LOTS OF EBOOKS. 100 % FREE</h6>
			        <p className="d-none d-md-block">Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting to be discovered.</p>
			      </div>
			    </div>
			    <div className="carousel-item">
			      <img src="https://manybooks.net/sites/default/files/2018-07/bookcoverssmall2.jpg" className="d-block w-100 imgCarousal" alt="" style={{height:'534px'}}/>
			      <div className="carousel-caption  d-md-block">
			        <h6>FREE AND DISCOUNTED BESTSELLERS</h6>
			        <p className="d-none d-md-block">Get free and discounted bestsellers straight to your inbox with the ManyBooks eBook deals newsletter.</p>
			      </div>
			    </div>
			    <div className="carousel-item">
			      <img src="https://manybooks.net/sites/default/files/2018-07/bookstackssmall.jpg" className="d-block w-100 imgCarousal" alt="" style={{height:'534px'}}/>
			      <div className="carousel-caption  d-md-block">
			        <h6>THE ULTIMATE GUIDE TO FREE EBOOKS</h6>
			        <p className="d-none d-md-block">Not sure what to read next? Explore our catalog of public domain books with our editors. Some real gems are hidden in our library.</p>
			      </div>
			    </div>
			  </div>
			  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
			    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
			    <span className="carousel-control-next-icon" aria-hidden="true"></span>
			    <span className="sr-only">Next</span>
			  </a>
		</div>
	)
}

export default Carousal