import React from 'react'
import './styles/BookDetails.css';
import {Link} from 'react-router-dom';

const BookDetails = () => {
	return (
		<div className="bookdetails container">
			<div className="row mt-4">
				<div className="col-md-3">
					<div className="bookdetails__info">
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
						<p>By <Link to='/author/heinrichbolton'>Adam Nicholas</Link></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookDetails