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