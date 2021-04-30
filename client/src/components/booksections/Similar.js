import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

const Similar = ({similarbooks}) => {

	const responsive = {
	  superLargeDesktop: {
	    // the naming can be any, depends on you.
	    breakpoint: { max: 4000, min: 3000 },
	    items: 4
	  },
	  desktop: {
	    breakpoint: { max: 3000, min: 1024 },
	    items: 3
	  },
	  tablet: {
	    breakpoint: { max: 1024, min: 464 },
	    items: 2
	  },
	  mobile: {
	    breakpoint: { max: 464, min: 0 },
	    items: 1
	  }
	};

	return (
		<div className="similar">
			<div className="similar__wrapper text-center">
				<Carousel responsive={responsive}>
					{
						similarbooks && similarbooks.map((book,i) =>(
								<Card key={i} data={book}/>
							))
					}
				</Carousel>
			</div>
		</div>
	)
}

export default Similar