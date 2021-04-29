import React from 'react'
import {Link} from 'react-router-dom';

const Card = ({data}) => {
	return (
	<div className="editorchoice__card">
			<img src={data?.image} alt="" className="img-fluid card__img" style={{height:'300px'}}/>
		<div>
			<Link to={`/book/details/${data?.bookSlug}`}>{data?.booktitle}</Link>
		</div>
	</div>
	)
}

export default Card