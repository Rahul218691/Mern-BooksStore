import axios from 'axios';
import {
    USER_AUTH_SUCCESS,
    USER_AUTH_REQUEST,
    USER_AUTH_FAIL,
    USER_LOGOUT
} from '../constants/authConstants';


const BASEURL = 'http://localhost:5000/api'

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_AUTH_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        `${BASEURL}/auth/login`,
        { email, password },
        config
      )
  
      dispatch({
        type: USER_AUTH_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  
  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_AUTH_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        `${BASEURL}/auth/register`,
        { name, email, password },
        config
      )
  
      dispatch({
        type: USER_AUTH_SUCCESS,
        payload: data,
      })
      
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const googleAuth = (tokenId) =>async(dispatch) =>{
    try {
      dispatch({
        type: USER_AUTH_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${BASEURL}/auth/googleauth`,
        { tokenId },
        config
      )

      dispatch({
        type: USER_AUTH_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: USER_AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
  }