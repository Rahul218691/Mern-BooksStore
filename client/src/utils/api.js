import axios from 'axios';

export const increamentView = async(slug) =>{
	try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
	    await axios.get(`http://localhost:5000/api/blog/view/${slug}`,config);
		return true;
	} catch(e) {
		console.error(e.message);
	}
}

export const downloadBook = async(file) =>{
	try {
	 const filename = file.split('files/')[1];
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }	
      await axios.get(`http://localhost:5000/api/books/download/${filename}`,config);
      return true;	
	} catch(e) {
		console.log(e.message);
	}
}