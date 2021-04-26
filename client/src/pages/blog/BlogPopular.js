import React from 'react'
import {Link} from 'react-router-dom';

const BlogPopular = ({popularblog}) => {
	return (
		<>
			{
				popularblog && popularblog.map((blog,i) =>(
					<Link to={`/blog/details/${blog?.slug}`} key={i}>
						<div className="blogdetails__popularImage">
							<img src={blog?.image} alt="" className="img-fluid"/>
						</div>
						<div>
							<p className="text-muted">{blog?.title}</p>
						</div>
					</Link>
					))
			}
		</>
	)
}

export default BlogPopular