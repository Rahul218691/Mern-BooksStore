import {
AUTHOR_FETCH,
AUTHOR_FAILED,
AUTHOR_REQUEST,
AUTHOR_CREATE
} from '../constants/authorConstants';
import axios from 'axios';

const BASEURL = 'http://localhost:5000/api/author';



export const fetchAuthors = (page,limit) => async (dispatch,getState) => {
	page = page ? page : 1;
	limit = limit ? limit : 5;
    try {
      dispatch({
        type:AUTHOR_REQUEST
      });
      
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userInfo.token}`,
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/allauthors?page=${page}&limit=${limit}`,
        config
      )
      dispatch({
        type: AUTHOR_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AUTHOR_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  

export const uploadAuthor = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:AUTHOR_REQUEST
      });
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      } 

      const {data} = await axios.post(
        `${BASEURL}/addauthor`,
        formdata,
        config
      )

      dispatch({
        type:AUTHOR_CREATE,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: AUTHOR_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }