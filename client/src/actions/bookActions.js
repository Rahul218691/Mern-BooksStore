import axios from 'axios';

import {
	BOOK_CREATE,
	BOOK_FETCH,
	BOOK_FAILED,
	BOOK_EDIT,
	BOOK_REQUEST,
	BOOK_DELETE,
  NEWARRIVAL_REQUEST,
  NEWARRIVAL_SUCCESS,
  NEWARRIVAL_FAIL,
  EDITORS_BOOKS_REQUEST,
  EDITORS_BOOKS_SUCCESS,
  EDITORS_BOOKS_FAIL,
  CLASSICS_BOOKS_REQUEST,
  CLASSICS_BOOKS_SUCCESS,
  CLASSICS_BOOKS_FAIL,
  SINGLE_BOOK_REQUEST,
  SINGLE_BOOK_SUCCESS,
  SINGLE_BOOK_FAIL
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
        type:SINGLE_BOOK_REQUEST
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
        type: SINGLE_BOOK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SINGLE_BOOK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  


export const fetchArrivals = (page,limit) => async (dispatch) => {
  page = page ? page : 1;
  limit = limit ? limit : 12;
    try {
      dispatch({
        type:NEWARRIVAL_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/newarrivals?page=${page}&limit=${limit}`,
        config
      )
      dispatch({
        type: NEWARRIVAL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: NEWARRIVAL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
} 

export const fetchEditorsChoice = (page,limit) => async (dispatch) => {
  page = page ? page : 1;
  limit = limit ? limit : 12;
    try {
      dispatch({
        type:EDITORS_BOOKS_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/editorchoice?page=${page}&limit=${limit}`,
        config
      )
      dispatch({
        type: EDITORS_BOOKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EDITORS_BOOKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  

export const fetchClassics = (limit) => async (dispatch) => {
  limit = limit ? limit : 12;
    try {
      dispatch({
        type:CLASSICS_BOOKS_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/classicbooks?limit=${limit}`,
        config
      )
      dispatch({
        type: CLASSICS_BOOKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CLASSICS_BOOKS_FAIL,
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

export const uploadPdffile = (formdata) =>async(dispatch,getState) =>{
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
        `${BASEURL}/uploadfile`,
          formdata,
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

export const publishBooks = (id) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:BOOK_REQUEST
      });
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      } 

      const {data} = await axios.patch(
        `${BASEURL}/publish`,
          {id},
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