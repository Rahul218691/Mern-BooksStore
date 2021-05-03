import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Paginate,Footer,Loading} from '../index';
import {Link} from 'react-router-dom';
import {fetchBlogs} from '../../actions/blogActions';
import './styles.css';

const AllBlogs = () => {

	const perPage = 12;
	const dispatch = useDispatch();
	const [page, setPage] = useState(1)
	const {loading,blogs,numOfBlogs} = useSelector(state=>state.blogs)

	useEffect(() => {
		dispatch(fetchBlogs(page,perPage))
	}, [dispatch,page])

	const paginate = (pageNumber) =>{
		setPage(pageNumber)
	}

	return loading ? <Loading /> :(
		<>
			<div className="allblogs container mt-2">
				<h3 className="text-muted text-center">Blogs</h3>
				<div className="allblogs__main">
					{
						blogs && blogs.map((blog,i) =>(
							<Link to={`/blog/details/${blog.slug}`} key={i}>
								<div style={{margin:'10px'}}>
									<img src={blog.image} className="img-fluid" width="400" alt="" />
									<div>
										<p className="text-muted text-center">{blog.title}</p>
									</div>
								</div>
							</Link>
						))
					}
				</div>
				<Paginate paginate={paginate} totalRec={numOfBlogs} perPage={perPage} pagi={page}/>
			</div>
			<Footer />
		</>
	)
}

export default AllBlogs