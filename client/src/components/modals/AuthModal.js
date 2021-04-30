import React from 'react'
import {Modal,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const AuthModal = ({show,handleClose}) => {
	return (
			<Modal show={show} onHide={handleClose}  
			     backdrop="static"
		        keyboard={false}>
			        <Modal.Body>
			        	<h4 className="text-center">Please login to download books.</h4>
			        	<div className="d-flex justify-content-center">
			        		<Link to='/login' className="btn" style={{background:'#17a288',color:'white'}}>Login</Link>
			        	</div>
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={handleClose}>
			            Close
			          </Button>
			        </Modal.Footer>
			</Modal>
	)
}

export default AuthModal