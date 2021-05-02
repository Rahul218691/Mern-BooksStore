import React,{useEffect} from 'react'
import './Search.css';
import Card from '../../components/booksections/Card';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {Loading,Footer} from '../../components';
import {searchBook} from '../../actions/bookActions';

const Search = () => {

	const dispatch = useDispatch();
	const {books,loading} = useSelector(state=>state.searchResults)
	const {searchterm} = useParams();

	useEffect(() => {
		dispatch(searchBook(searchterm))
	}, [dispatch,searchterm]);

	const handleChange = (e) =>{
		dispatch(searchBook(searchterm,e.target.value))
	}

	return (
		<>
		<div className="search container mt-4">
			{loading && <Loading />}
				<div className="search__header">
					<h3 className="text-muted">{searchterm}</h3>
					<div className="form-group">
						<select className="form-control" onChange={handleChange}>
							<option value="">Filter</option>
							<option value="-createdAt">Latest</option>
							<option value="createdAt">Oldest</option>
							<option value="-downloads">Popularity</option>
							<option value="-comments.rating">Rating</option>
						</select>
					</div>
				</div>
				<div className="search__books mt-4">
					{
						books && books.map((book,i) =>(
							<Card key={i} data={book}/>
						))
					}
				</div>
		</div>
		<Footer />
		</>
	)
}

export default Search