import axios from 'axios';
import {
	CATBOOK_REQUEST,
	CATBOOK_FETCH,
	CATBOOK_FAIL
} from '../constants/catBookConstants';

const BASEURL = 'http://localhost:5000/api/category';

export const fetchCatBooks = (slug,page,limit,sort) => async (dispatch) => {
	page = page ? page : 1;
	limit = limit ? limit : 12;
	sort = sort ? sort : '-createdAt';
    try {
      dispatch({
        type:CATBOOK_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/${slug}?page=${page}&limit=${limit}&sort=${sort}`,
        config
      )
      dispatch({
        type: CATBOOK_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CATBOOK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  
