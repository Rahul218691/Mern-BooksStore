import React,{useEffect,useState} from 'react'
import {Paginate,Footer,Loading} from '../index';
import {useDispatch,useSelector} from 'react-redux';
import {fetchGenres} from '../../actions/genreActions';
import {Link} from 'react-router-dom';

const AllGenre = () => {

	const dispatch = useDispatch();
	const [page, setPage] = useState(1)
	const {loading,genres,numOfGenres} = useSelector(state=>state.genresList);

	useEffect(() => {
		dispatch(fetchGenres(page))
	}, [dispatch,page])

	const paginate = (pageNumber) =>{
		setPage(pageNumber)
	}


	return loading ? <Loading /> :(
		<>
		<div className="allgenre container mt-2">
			<h3 className="text-muted text-center">Genres</h3>
			<div className="allgenre__main">
				<div className="row">
					{
						genres && genres.map((genre,i) =>(
						<div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-2" key={i}>
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
			</div>
			<Paginate paginate={paginate} totalRec={numOfGenres} perPage={12} pagi={page}/>
		</div>
		<Footer />
		</>
	)
}

export default AllGenre