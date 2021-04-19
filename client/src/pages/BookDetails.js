import React from 'react'
import './styles/BookDetails.css';
import {Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import {SimilarBooks,Footer,Comment} from '../components';

const BookDetails = () => {
	return (
		<>
		<div className="bookdetails container">
			<div className="row mt-4">
				<div className="col-md-3">
					<div className="bookdetails__info text-center">
						<img src="https://manybooks.net/sites/default/files/styles/220x330sc/public/2021-04/51M7VoSmeAL.jpeg?itok=3Z1GMOYP" className="img-fluid mb-2" alt=""/>
						<p>PUBLISHED: 2021</p>
						<p>PAGES: 266</p>
						<p>DOWNLOADS: 282</p>
						<div className="bookdetails__share">
							<p><b>Share This</b></p>
							<div className="bookdetails__shareicons">
								<span><i className="fab fa-twitter" style={{color: 'deepskyblue'}}></i></span>
								<span><i className="fab fa-facebook-f" style={{color: 'blue'}}></i></span>
								<span><i className="far fa-envelope" style={{color: 'gray'}}></i></span>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-9">
					<div className="bookdetails__name">
						<h3 className="text-muted">Missing</h3>
						<div className="bookdetails__wrapper">
							<p className="bookdetails__author">By <Link to='/author/heinrichbolton'>Adam Nicholas</Link></p>
								<StarRatings 
								rating={4}
								numberOfStars={5}
								starDimension='20px'
								starSpacing='0px'
								starRatedColor='rgb(230, 67, 47)'
								/> <span className="bookdetails__avgReview">(10 Reviews)</span>
						</div>
					</div>
					<div className="bookdetails__buttons mb-2">
						<button className="btn downloadbtn"><i className="fas fa-download"></i> Download</button>
						<button className="btn readOnline">Read Online</button>
					</div>
					<div className="bookinfo mb-2">
						<span><i className="fas fa-info-circle"></i></span>
						<p className="text-muted">This book is available for free download.
						You can also read the full text online using our E-reader.
						</p>
					</div>
					<div className="bookdetails__description">
						<p>An orphan boy. A mysterious stranger. A city in crisis.</p>
						<p>When 14-year-old Lance is saved from death, his life is forever changed.
						 For starters, his savior claims to be King Arthur, the once and future ruler of ancient Britain.
						 Lance has met lots of weirdos on the streets of L.A.,
						 and they claim to be many things. But this “king” not only reeks of sincerity,
						 he wears armor, rides a gorgeous white horse, and lives in the storm drains underneath the city! Arthur has a throne,
						 old-school clothes, and weapons up the wazoo. Swords, daggers, bows and arrows—the kind Lance has only seen in movies.
						 </p>
						 <p>
						 	Turns out this Arthur guy wants to start some kind of revolution.
						 	He plans to collect other cast-off kids like Lance—even teen gang members—and create a New Camelot of Knights to gain more rights for youth and shake up the out-of-touch politicians who run Los Angeles.
						 </p>
						 <p>
						 	Lance is all for helping kids like him.
						 	He’s spent his entire life in and out of the system, and it sucks.
						 	And he wants to believe in Arthur, but doubts even a king can accomplish such lofty goals.
						 	Despite these uncertainties, Lance readily accepts the position of First Knight—youth leader of Arthur’s new army—thereby setting in motion a crusade of tsunami proportions.
						 	When the children rise, will the city fall?
						 </p>
					</div>
					<div className="bookdetails__tags mb-4">
						<span><Link to='#' className='btn tags'>Young Readers</Link></span>
						<span><Link to='#' className='btn tags'>Romance</Link></span>
						<span><Link to='#' className='btn tags'>Search</Link></span>
					</div>

					<div className="bookdetails__similar mb-2">
						<p>SIMILAR BOOKS <Link to='#'>(view all)</Link></p>
						<SimilarBooks />
					</div>
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-md-12">
					<Comment />
				</div>
			</div>
		</div>
		<Footer />
		</>
	)
}

export default BookDetails