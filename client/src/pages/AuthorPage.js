import React from 'react'
import './styles/AuthorPage.css';
import Card from '../components/booksections/Card';
import {Footer} from '../components'

const AuthorPage = () => {
	return (
		<>
		<div className="authorpage container">
			<div className="authorpage__wrapper">
				<div className="authorpage__profile">
					<div className="authorpage__image">
						<img src="https://png.pngtree.com/png-vector/20190525/ourmid/pngtree-man-avatar-icon-professional-man-character-png-image_1055448.jpg" alt="" className="img-fluid"/>
					</div>
					<div className="authorpage__icons">
						<p className="text-center mt-2">Share Profile</p>
						<div>
							<span><i className="fab fa-twitter" style={{color: 'deepskyblue'}}></i></span>
							<span><i className="fab fa-facebook-f" style={{color: 'blue'}}></i></span>
							<span><i className="far fa-envelope" style={{color: 'gray'}}></i></span>
						</div>
					</div>
				</div>
				<div className="authorpage__desc">
					<h3 className="text-muted">Heinrich Bolton</h3>
					<p>
						Heinrich Bolton discovered a passion for books at a very young age.
						He signed up every member of his family at the library,
						just so he can take out more books. At about the same time,
						he started writing reviews about the books he read and the movies he watched in a notebook.
						His urge to write has only increased since, and Bolton is now making a living from his writing.
					</p>
				</div>
			</div>
			<div className="authorpage__mybooks mt-4">
				<h4>Books by Heinrich Bolton</h4>
				<div className="authorpage__books">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
		<Footer />
		</>
	)
}

export default AuthorPage