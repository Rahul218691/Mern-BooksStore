import React,{useState,useEffect} from 'react'
import StarRatings from 'react-star-ratings';
import './Comment.css';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import {SINGLE_BOOK_COMMENT} from '../../constants/bookConstants';

let socket;

const Comment = ({bookslug,comments}) => {

	const dispatch = useDispatch();
	const {userInfo} = useSelector(state=>state.userLogin);

	const [rating, setRating] = useState(0);
	const [show,setShow] = useState(false);
	const [comment, setComment] = useState('');

	const setRate = (newRating,name) =>{
		setRating(newRating)
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		if(comment){
			// console.log(comment)
			socket.emit('sendmessage',{
				rating,
				comment,
				bookslug,
				user:userInfo._id
			});
			setRating(0);
			setComment('')
		}
	}

	useEffect(() => {
		socket = io('http://localhost:5000');
	},[]);

	useEffect(() => {
		socket.on('receivemsg',msg=>{
			if(msg.room === bookslug){
				dispatch({
					type:SINGLE_BOOK_COMMENT,
					payload:msg.message
				})
			}
		});
		return () =>socket.off('receivemsg');
		// eslint-disable-next-line
	}, [])

	const rate = comments && comments?.reduce((acc,item) => {
		return acc + item.rating
	},0);

	const avgRate = rate / (comments && comments?.length);


	return (
		<div className="comments">
			<h5 className="text-muted">READERS REVIEWS</h5>
			<div className="comments__avgrate">
				<p>Average from ({comments?.length}) Review</p>
				<StarRatings 
					rating={avgRate ? avgRate : 0}
					numberOfStars={5}
					starDimension='20px'
					starSpacing='0px'
					starRatedColor='rgb(230, 67, 47)'
				/>
			</div>
			<div className="comments__actions text-center mb-4">
				<button className="btn writereview mb-2" onClick={()=>setShow(!show)}>{!show ? 'Write Review' : 'Hide Review'}</button>
				{
					show && (
						<div className="wrapper">
							{
								!userInfo && (
							<div>
								<h5>Please login or sign up below in order to leave a review</h5>
								<div className="auth__buttons">
									<Link to='/login' className="btn">Login</Link>
									<Link to='/register' className="btn">Register</Link>
								</div>
							</div>
									)
							}
							{
								userInfo && (
							<div className="comments__box">
								<form onSubmit={handleSubmit}>
								<label>Rating:</label> {" "}
										<StarRatings 
											rating={rating}
											starRatedColor='red'
											numberOfStars={5}
											starDimension='25px'
											name='rating'
											changeRating={(e)=>setRate(e)}
										/>
									<div className="form-group mt-2">
										<textarea className="form-control" placeholder="Type your comment..."
										value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
									</div>
									<div>
										<button className="btn btn-primary" type="submit">Submit</button>
									</div>
								</form>
							</div>
									)
							}
						</div>
						)
				}
			</div>
			<div className="usercomments mb-4">
			{
				comments && comments.map((comment,i) =>(
				<div className="mycomment" key={i}>
					<div className="userInfo__withrating">
						<img width = '50' height="50" style={{objectFit:'cover',borderRadius:'50%'}} src={comment?.user?.profile} alt="" className="img-fluid"/>
						<div className="user__info">
							<p>{comment?.user?.name}</p>
							<StarRatings 
								rating={comment?.rating}
								starDimension='25px'
								numberOfStars={5}
								starRatedColor='red'
								starSpacing='0px'
							/>
						</div>
					</div>
					<div className="usercomment">
						<p>{comment?.comment}</p>
					</div>
				</div>
					))
			}
			</div>
		</div>
	)
}

export default Comment