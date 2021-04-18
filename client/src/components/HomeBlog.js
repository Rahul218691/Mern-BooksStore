import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Link} from 'react-router-dom';

const HomeBlog = () => {

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
					<Link to='/blog/details/blog1'>
						<div style={{margin:'10px'}}>
							<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/generation23background.png?itok=Lr2J4_Id" className="img-fluid" alt=""/>
							<div>
								<p className="text-muted">Editorial Review: Generation 23: Hallowed Be Thy Noble Name by Ivan Ertlov</p>
							</div>
						</div>
					</Link>
					<Link to='/blog/details/blog2'>
						<div style={{margin:'10px'}}>
							<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/old-article-files/fantasy-3077928_1280.jpg?itok=Y6eq-IDs" className="img-fluid" alt=""/>
							<div>
								<p className="text-muted">Four Free Fantasy Short Story Collections</p>
							</div>
						</div>
					</Link>
					<Link to='/blog/details/blog3'>
						<div style={{margin:'10px'}}>
							<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/deaddontdrink.jpg?itok=KQX7JoDj" className="img-fluid" alt=""/>
							<div>
								<p className="text-muted">Editorial Review: The Dead Don't Drink At Lafitte's by Seana Kelly</p>
							</div>
						</div>
					</Link>
					<Link to='/blog/details/blog4'>
						<div style={{margin:'10px'}}>
							<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/laststar32.jpg?itok=1sSSJYjv" className="img-fluid" alt=""/>
							<div>
								<p className="text-muted">Editorial Review: Last Star Standing by Spaulding Taylor</p>
							</div>
						</div>
					</Link>
				</Carousel>
		</div>
	)
}

export default HomeBlog