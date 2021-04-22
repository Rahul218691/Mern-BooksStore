import React from 'react'
import './styles/Carousal.css';
import {Loading} from './index';
import { Carousel, Image } from 'react-bootstrap';

const Carousal = ({loading,carousal}) => {
	return loading ? (
			<Loading />
		) : (
		<Carousel pause='hover' className='bg-dark'>
	      {carousal.map((product) => (
	        <Carousel.Item key={product._id}>
	            <Image src={product.image} alt={product.title} style={{height:'534px'}} className="imgCarousal w-100" fluid />
	            <Carousel.Caption className='carousel-caption'>
	              <h6>
	                {product.title}
	              </h6>
	              <p className="d-none d-md-block">{product.content}</p>
	            </Carousel.Caption>
	        </Carousel.Item>
	      ))}
	    </Carousel>	
		)
}

export default Carousal