import React from 'react'
import {Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({addWidth,toggleWidth}) => {
	return (
		<div id="mySidenav" className="sidenav" style={{width:`${addWidth ? '250px' : '0'}`}}>
			<Link to='#' className="closebtn" onClick={()=>toggleWidth()}>&times;</Link>
			<Link to="/admin/dashboard">Dashboard</Link>
			<Link to='/admin/carousal'>Carousal</Link>
			<Link to='/admin/genere'>Genere</Link>
			<Link to="/admin/addauthor">Add Author</Link>
			<Link to="/admin/createblog">Create Blog</Link>
		</div>
	)
}

export default Sidebar