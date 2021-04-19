import React,{useState} from 'react'
import './Category.css';
import Card from '../../components/booksections/Card';
import {Footer} from '../../components';

const Category = () => {

	const [show, setShow] = useState(false);

	const filterComp = () =>{
		return(
				<div className="category__filter mb-2">
					<p>sort by:</p>
					<div className="category__radiobtn">
						<div className="form-group">
							<input type="radio" name="sort"/> {" "}
							<label>Popularity</label>
						</div>
						<div className="form-group">
							<input type="radio" name="sort"/> {" "}
							<label>Rating</label>					
						</div>
						<div className="form-group">
							<input type="radio" name="sort"/> {" "}
							<label>Older</label>					
						</div>
						<div className="form-group">
							<input type="radio" name="sort"/> {" "}
							<label>Latest</label>					
						</div>
					</div>
					<div className="category__language">
						<div className="form-group">
						<label htmlFor="chooseLang">Language</label>
							<select id="chooseLang" className="form-control">
								<option value="en">English</option>
							</select>
						</div>
					</div>
				</div>
			)
	}


	return (
		<>
		<div className="category container mt-4">
			<div className="category__header">
				<h4 className="text-muted">Category Name</h4>
				<button className="btn" onClick={()=>setShow(!show)}><i className="fas fa-filter"></i> Filter</button>
			</div>
			{
				show && (
						filterComp()
					)
			}
			<div className="category__books mt-4">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
		<Footer />
		</>
	)
}

export default Category