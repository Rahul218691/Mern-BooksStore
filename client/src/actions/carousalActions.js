import axios from 'axios';
import {
CAROUSAL_CREATE,
CAROUSAL_FETCH,
CAROUSAL_EDIT,
CAROUSAL_DELETE,
CAROUSAL_FAILED,
CAROUSAL_REQUEST
} from '../constants/carousalConstants';

const BASEURL = 'http://localhost:5000/api';


export const uploadCarousal = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:CAROUSAL_REQUEST
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
        `${BASEURL}/addcarousal`,
        formdata,
        config
      )

      dispatch({
        type:CAROUSAL_CREATE,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: CAROUSAL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


export const updateCarousal = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:CAROUSAL_REQUEST
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
        `${BASEURL}/editcarousal`,
        formdata,
        config
      )

      dispatch({
        type:CAROUSAL_EDIT,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: CAROUSAL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


export const removeCarousal = (carousalId) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:CAROUSAL_REQUEST
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
        `${BASEURL}/carousal/${carousalId}`,
        config
      )

      dispatch({
        type:CAROUSAL_DELETE,
        payload:carousalId
      })

    } catch (error) {
      dispatch({
        type: CAROUSAL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


export const fetchFiles = () => async (dispatch) => {
    try {
      dispatch({
        type:CAROUSAL_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/getcarousal`,
        config
      )
      dispatch({
        type: CAROUSAL_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CAROUSAL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }  