import axios from 'axios';
import {
BLOG_REQUEST,
BLOG_FETCH,
BLOG_CREATE,
BLOG_FAILED,
GET_DETAILS_BLOG_REQUEST,
GET_DETAILS_BLOG_SUCCESS,
GET_DETAILS_BLOG_FAIL,
} from '../constants/blogConstants';

const BASEURL = 'http://localhost:5000/api/blog';

export const fetchBlogs = (page,limit) => async (dispatch) => {
	page = page ? page : 1;
	limit = limit ? limit : 5;
    try {
      dispatch({
        type:BLOG_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/allblogs?page=${page}&limit=${limit}`,
        config
      )
      dispatch({
        type: BLOG_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BLOG_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  


export const uploadBlog = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:BLOG_REQUEST
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
        `${BASEURL}/addblog`,
        formdata,
        config
      )

      dispatch({
        type:BLOG_CREATE,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: BLOG_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


export const fetchBlog = (slug) => async (dispatch) => {
    try {
      dispatch({
        type:GET_DETAILS_BLOG_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/${slug}`,
        config
      )
      dispatch({
        type: GET_DETAILS_BLOG_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GET_DETAILS_BLOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  
