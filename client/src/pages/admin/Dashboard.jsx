import React,{useState} from 'react'
import {Sidebar} from '../../components';
import './styles/Dashboard.css';


const Dashboard = () => {

	const [addWidth,setAddWidth] = useState(false);

	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}
 
    return (
        <div className="dashboard">
            <Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
            <div className="dashboard__nav">
            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
            </div>
            <div className="dashboard__main container-fluid mt-2">
            	Dashboard Management 
            </div>
        </div>
    )
}

export default Dashboard
