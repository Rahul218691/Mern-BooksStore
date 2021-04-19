import React,{useState} from 'react'
import StarRatings from 'react-star-ratings';
import './Comment.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Comment = () => {

	const {userInfo} = useSelector(state=>state.userLogin);

	const [rating, setRating] = useState(0);
	const [show,setShow] = useState(false);

	const setRate = (newRating,name) =>{
		setRating(newRating)
	}

	return (
		<div className="comments">
			<h5 className="text-muted">READERS REVIEWS</h5>
			<div className="comments__avgrate">
				<p>Average from (1) Review</p>
				<StarRatings 
					rating={4}
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
								<form>
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
										<textarea className="form-control" placeholder="Type your comment..."></textarea>
									</div>
									<div>
										<button className="btn btn-primary">Submit</button>
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
				<div className="mycomment">
					<div className="userInfo__withrating">
						<img width = '50' height="50" style={{objectFit:'cover'}} src="https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg" alt="" className="img-fluid"/>
						<div className="user__info">
							<p>Isabella Martinez</p>
							<StarRatings 
								rating={3}
								starDimension='25px'
								numberOfStars={5}
								starRatedColor='red'
								starSpacing='0px'
							/>
						</div>
					</div>
					<div className="usercomment">
						<p>this book was great i love the characters and the details</p>
					</div>
				</div>
				<div className="mycomment">
					<div className="userInfo__withrating">
						<img width = '50' height="50" style={{objectFit:'cover'}} src="https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg" alt="" className="img-fluid"/>
						<div className="user__info">
							<p>Isabella Martinez</p>
							<StarRatings 
								rating={3}
								starDimension='25px'
								numberOfStars={5}
								starRatedColor='red'
								starSpacing='0px'
							/>
						</div>
					</div>
					<div className="usercomment">
						<p>this book was great i love the characters and the details</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Comment