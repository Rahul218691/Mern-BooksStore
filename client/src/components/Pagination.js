import React from 'react'
import {Link} from 'react-router-dom'

const Pagination = ({paginate,totalRec,pagi}) => {
	const perPage = 12;
	const pageNumbers=[];
	for(let i=1;i<=Math.ceil(totalRec/perPage);i++){
		pageNumbers.push(i);
	}

	return (
		<nav className="mt-2">
			<ul className='pagination'>
				{pageNumbers.map(number =>(
						<li key={number} className={`${pagi === number ? 'page-item active' : 'page-item'}`}>
						<Link onClick={() => paginate(number)} to='#' className='page-link'>
						{number}
						</Link>
						</li>
					))}
			</ul>
		</nav>
	)
}

export default Pagination