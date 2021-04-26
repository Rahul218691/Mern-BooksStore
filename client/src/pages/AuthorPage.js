import React,{useEffect} from 'react'
import './styles/AuthorPage.css';
import Card from '../components/booksections/Card';
import {Footer,Loading} from '../components'
import {fetchAuthor} from '../actions/authorActions';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

const AuthorPage = () => {

	const dispatch = useDispatch();
	const {authorinfo,loading} = useSelector(state=>state.authordetails);

	const {authorname} = useParams();

	useEffect(() => {
		dispatch(fetchAuthor(authorname));
	}, [authorname,dispatch])

	return (
		<>
		<div className="authorpage container">
			{loading && <Loading />}
			<div className="authorpage__wrapper">
				<div className="authorpage__profile">
					<div className="authorpage__image">
						<img src={authorinfo?.image} alt="" className="img-fluid" style={{borderRadius:'50%'}}/>
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
					<h3 className="text-muted">{authorinfo?.name}</h3>
					<p>
						{authorinfo?.description}
					</p>
				</div>
			</div>
			<div className="authorpage__mybooks mt-4">
				<h4>Books by {authorinfo?.name}</h4>
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