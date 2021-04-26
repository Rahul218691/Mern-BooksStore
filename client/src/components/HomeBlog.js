import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Link} from 'react-router-dom';
import './styles/HomeBlog.css';

const HomeBlog = ({blogs}) => {

	const responsive = {
	  superLargeDesktop: {
	    // the naming can be any, depends on you.
	    breakpoint: { max: 4000, min: 3000 },
	    items: 3
	  },
	  desktop: {
	    breakpoint: { max: 3000, min: 1024 },
	    items: 2
	  },
	  tablet: {
	    breakpoint: { max: 1024, min: 464 },
	    items: 1
	  },
	  mobile: {
	    breakpoint: { max: 464, min: 0 },
	    items: 1
	  }
	};

	return (
		<div className="homeblog">
				<Carousel responsive={responsive}>
				{
					blogs && blogs.map((blog,i) =>(
						<Link to={`/blog/details/${blog.slug}`} key={i}>
							<div style={{margin:'10px'}} className="homeblog__maindiv">
								<img src={blog.image} className="img-fluid images" alt="" style={{width:'100%',height:'300px'}}/>
								<div>
									<p className="text-muted text-center">{blog.title}</p>
								</div>
							</div>
						</Link>
						))
				}
				</Carousel>
		</div>
	)
}

export default HomeBlog