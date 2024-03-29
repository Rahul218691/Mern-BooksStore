import React from 'react'
import './styles/EditorChoice.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

const EditorChoice = ({editorsbook}) => {

		// console.log(editorsbook)
	const responsive = {
	  superLargeDesktop: {
	    // the naming can be any, depends on you.
	    breakpoint: { max: 4000, min: 3000 },
	    items: 5
	  },
	  desktop: {
	    breakpoint: { max: 3000, min: 1024 },
	    items: 4
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
		<div className="editorchoice">
			<div className="editorchoice__wrapper text-center">
				<Carousel responsive={responsive}>
					{
						editorsbook !== undefined ? editorsbook.map((book,i) =>(
								<Card data={book} key={i}/>
							)) : <Card />
					}
				</Carousel>
			</div>
		</div>
	)
}

export default EditorChoice