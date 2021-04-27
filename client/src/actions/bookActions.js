import axios from 'axios';

import {
	BOOK_CREATE,
	BOOK_FETCH,
	BOOK_FAILED,
	BOOK_EDIT,
	BOOK_REQUEST,
	BOOK_DELETE,
	BOOK_SINGLE
} from '../constants/bookConstants';

const BASEURL = 'http://localhost:5000/api/books';


export const fetchBooks = (page,limit) => async (dispatch) => {
	page = page ? page : 1;
	limit = limit ? limit : 12;
    try {
      dispatch({
        type:BOOK_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/allbooks?page=${page}&limit=${limit}`,
        config
      )
      dispatch({
        type: BOOK_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  

export const fetchBook = (slug) => async (dispatch) => {
    try {
      dispatch({
        type:BOOK_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/single/${slug}`,
        config
      )
      dispatch({
        type: BOOK_SINGLE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  


export const uploadBook = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:BOOK_REQUEST
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
        `${BASEURL}/addbook`,
        formdata,
        config
      )

      dispatch({
        type:BOOK_CREATE,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: BOOK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateBook = (id,price,editorsChoice) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:BOOK_REQUEST
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

      const {data} = await axios.put(
        `${BASEURL}/editbook`,
        {id,price,editorsChoice},
        config
      )

      dispatch({
        type:BOOK_EDIT,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: BOOK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const removeBook = (bookid) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:BOOK_REQUEST
      });
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      } 

      await axios.delete(
        `${BASEURL}/removebook/${bookid}`,
        config
      )

      dispatch({
        type:BOOK_DELETE,
        payload:bookid
      })

    } catch (error) {
      dispatch({
        type: BOOK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }