import React,{useEffect,useState} from 'react'
import './styles/BookDetails.css';
import {Link,useParams} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import {SimilarBooks,Footer,Comment,Loading,AuthModal} from '../components';
import {useSelector,useDispatch} from 'react-redux';
import {fetchBook} from '../actions/bookActions';
import {downloadBook} from '../utils/api';

const BookDetails = () => {

	const {bookslug} = useParams();

	const dispatch = useDispatch();
	const {book,similarbooks,loading} = useSelector(state=>state.bookInfo);
	const {userInfo} = useSelector(state=>state.userLogin);

	const [show, setShow] = useState(false)

	useEffect(() => {
		dispatch(fetchBook(bookslug))
	}, [dispatch,bookslug])

	const handleClose = () =>{
		setShow(false)
	}

	const handleOpen = (url) =>{
		if(!userInfo){
			setShow(true)
		}else{
			const filename =  url.split('/').pop();
			fetch(url)
			.then((response) => response.blob())
			.then((blob) =>{
				const file = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = file;
				link.setAttribute('download',`${filename}`);
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
				downloadBook(book?._id)
			})
		}
	}

	const rate = book && book?.comments?.reduce((acc,item) => {
		return acc + item.rating
	},0);

	const avgRate = rate / (book && book?.comments?.length);


	return loading ? (<Loading />):(
		<>
		<div className="bookdetails container">
			<div className="row mt-4">
				<div className="col-md-3">
					<div className="bookdetails__info text-center">
						<img src={book?.image} className="img-fluid mb-2" alt=""/>
						<p>PUBLISHED: 2021</p>
						<p>PRICE: {book?.price !== 0 ? book?.price : 'FREE'}</p>
						<p>DOWNLOADS: {book?.downloads}</p>
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
						<h3 className="text-muted">{book?.booktitle}</h3>
						<div className="bookdetails__wrapper">
							<p className="bookdetails__author">By <Link to={`/author/${book?.bookauthor?.slug}`}>{book?.bookauthor?.name}</Link></p>
								<StarRatings 
								rating={avgRate ? avgRate : 0}
								numberOfStars={5}
								starDimension='20px'
								starSpacing='0px'
								starRatedColor='rgb(230, 67, 47)'
								/> <span className="bookdetails__avgReview">({book?.comments?.length} Reviews)</span>
						</div>
					</div>
					<div className="bookdetails__buttons mb-2">
						<button className="btn downloadbtn" onClick={(e)=>handleOpen(book?.file)}><i className="fas fa-download"></i> Download</button>
						<button className="btn readOnline">Read Online</button>
					</div>
					{
						book?.price === 0 ? (
						<div className="bookinfo mb-2">
							<span><i className="fas fa-info-circle"></i></span>
							<p className="text-muted">This book is available for free download.
							You can also read the full text online using our E-reader.
							</p>
						</div>
						) : null
					}
					<div className="bookdetails__description" dangerouslySetInnerHTML={{ __html: book?.bookdescription }}>
						
					</div>
					<div className="bookdetails__tags mb-4">
						{
							book?.tags.split(',').map((tag,i) =>(
								<span key={i}><Link to={`/book/${tag}`} className='btn tags'>{tag}</Link></span>
							))
						}
					</div>

					<div className="bookdetails__similar mb-2">
						{
							similarbooks && similarbooks.length > 0 ?(
							<>
								<p>SIMILAR BOOKS <Link to='#'>(view all)</Link></p>
								<SimilarBooks similarbooks={similarbooks}/>
							</>	
							) : null
						}
					</div>
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-md-12">
					<Comment bookslug={bookslug} comments={book?.comments}/>
				</div>
			</div>
		</div>
		<AuthModal show={show} handleClose={handleClose}/>
		<Footer />
		</>
	)
}

export default BookDetails