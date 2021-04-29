import React from 'react'
import Card from './Card';

const Trending = ({newarrival}) => {
	return (
		<div className="trending">
			<div className="row text-center">
			{
				newarrival && newarrival.map((book,i) =>(
					<div className="col-md-3 mb-2" key={i}>
						<Card data={book}/>
					</div>
					))
			}
			</div>
		</div>
	)
}

export default Trending