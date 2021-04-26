import React,{useEffect,useState} from 'react'
import {Link,useParams} from 'react-router-dom';
import './styles/BlogDetails.css';
import {Footer,Loading} from '../../components';
import Popular from './BlogPopular';
import {fetchBlog,fetchBlogs} from '../../actions/blogActions';
import {useDispatch,useSelector} from 'react-redux';
import Moment from 'react-moment';

const BlogDetails = () => {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const {bloginfo,loading} = useSelector(state=>state.blogdetails);
	const {blogs} = useSelector(state=>state.blogs)
	const [filterdBlog, setFilteredBlog] = useState([]);

	const printPage = () =>{
		window.print();
	}

	useEffect(() => {
		dispatch(fetchBlog(slug))
		dispatch(fetchBlogs(1,5))
	}, [slug,dispatch]);

	useEffect(() => {
		if(blogs){
			const blogfilter = blogs.filter(x=>x.slug !== slug);
			setFilteredBlog(blogfilter)
		}
	}, [blogs,slug]);

	return (
		<>
		<div className="container-fluid">
		{loading && <Loading />}
			<div className="row mt-4 text-center">
				<div className="col-md-9">
					<div className="blogdetails__heading">
						<h2 className="text-muted ">{bloginfo?.title}</h2>
						<p>Posted on <Moment format="YYYY-MMMM-DD">{bloginfo?.createdAt}</Moment> by <Link to={`/author/${bloginfo?.author?.slug}`}>{bloginfo?.author?.name}</Link></p>
					</div>
					<div>
						<span><i className="fas fa-eye"></i> {bloginfo?.views} views</span>
					</div>
					<div className="blogdetails__imgcontainer">
						<img className="img-fluid" src={bloginfo?.image} alt=""/>
						<div className="blogdetails__icons">
							<span><i className="fab fa-twitter"></i></span>
							<span><i className="fab fa-facebook-f"></i></span>
							<span><i className="fab fa-instagram"></i></span>
							<span><i className="far fa-envelope"></i></span>
							<span onClick={()=>printPage()}><i className="fas fa-print"></i></span>
						</div>
					</div>
					<div className="blogdetails__description" dangerouslySetInnerHTML={{ __html: bloginfo?.description }}>
					</div>
				</div>
				<div className="col-md-3">
					<h4 className="similar__articles text-muted">POPULAR ARTICLES</h4>
					<div className="blogdetails__popular">
						<Popular popularblog={filterdBlog}/>
					</div>
				</div>
			</div>
		</div>
		<Footer />
		</>
	)
}

export default BlogDetails