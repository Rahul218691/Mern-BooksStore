import React from 'react'
import Card from './Card';

const Popular = () => {
	return (
		<div className="popular">
			<div className="row text-center">
				<div className="col-md-3 mb-2">
					<Card />
				</div>
				<div className="col-md-3 mb-2">
					<Card />
				</div>
				<div className="col-md-3 mb-2">
					<Card />
				</div>
				<div className="col-md-3 mb-2">
					<Card />
				</div>
				<div className="col-md-3 mb-2">
					<Card />
				</div>
				<div className="col-md-3 mb-2">
					<Card />
				</div>
			</div>
		</div>
	)
}

export default Popular