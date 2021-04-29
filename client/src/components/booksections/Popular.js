import React from 'react'
import Card from './Card';

const Popular = ({classics}) => {
	return (
		<div className="popular">
			<div className="row text-center">
				{
					classics && classics.map((classic,i) =>(
						<div className="col-md-3 mb-2" key={i}>
							<Card data={classic}/>
						</div>
						))
				}
			</div>
		</div>
	)
}

export default Popular