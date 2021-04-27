import axios from 'axios';
import {
GENERE_CREATE,
GENERE_FETCH,
GENERE_FAILED,
GENERE_REQUEST,
GENERE_LIST
} from '../constants/genreConstants';

const BASEURL = 'http://localhost:5000/api/genre';


export const uploadGenre = (formdata) =>async(dispatch,getState) =>{
    try {
      dispatch({
        type:GENERE_REQUEST
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
        `${BASEURL}/addgenre`,
        formdata,
        config
      )

      dispatch({
        type:GENERE_CREATE,
        payload:data
      })

    } catch (error) {
      dispatch({
        type: GENERE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


// export const removeGenre = (carousalId) =>async(dispatch,getState) =>{
//     try {
//       dispatch({
//         type:CAROUSAL_REQUEST
//       });
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       } 

//       await axios.delete(
//         `${BASEURL}/carousal/${carousalId}`,
//         config
//       )

//       dispatch({
//         type:CAROUSAL_DELETE,
//         payload:carousalId
//       })

//     } catch (error) {
//       dispatch({
//         type: CAROUSAL_FAILED,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }


export const fetchGenres = (page) => async (dispatch) => {
    try {
      dispatch({
        type:GENERE_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/getgenres?page=${page}`,
        config
      )
      dispatch({
        type: GENERE_FETCH,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GENERE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  

export const fetchGenresNames = () => async (dispatch) => {
    try {
      dispatch({
        type:GENERE_REQUEST
      });
      
      const config = {
        headers: {
         'Content-Type': 'application/json',
        },
      } 
      const { data } = await axios.get(
        `${BASEURL}/genrelist`,
        config
      )
      dispatch({
        type: GENERE_LIST,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GENERE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}  