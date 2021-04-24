import React from 'react'
import './styles/Genres.css';
import {Link} from 'react-router-dom';
import {Loader} from './index';

const Genres = ({loading,genres}) => {
	return (
		<div className="genres__main row">
			{
				loading ? (<Loader />) :
				genres.map((genre,i) =>(
					<div className="col-xs-6 col-sm-6 col-md-4 col-lg-3" key={i}>
						<Link to={`/book/${genre.genreSlug}`}>
						<img src={genre.poster} alt="" className="img-fluid" height="295" width="465"/>
						<div className="genere__cat">
							<span>{genre.title}</span>
						</div>
						</Link>
					</div>
					))
			}
		</div>
	)
}

export default Genres