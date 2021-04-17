import React from 'react'
import {Link} from 'react-router-dom';

const Card = () => {
	return (
	<div className="editorchoice__card">
			<img src="https://manybooks.net/sites/default/files/styles/220x330sc/public/2021-04/51tM9CAND2L.jpeg?itok=07NyXjHh" alt="" className="img-fluid"/>
		<div>
			<Link to="#">Finding London</Link>
		</div>
	</div>
	)
}

export default Card