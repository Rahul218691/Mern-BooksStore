import {
GENERE_CREATE,
GENERE_FETCH,
GENERE_DELETE,
GENERE_FAILED,
GENERE_REQUEST,
GENERE_RESET,
GENERE_CURRENTPAGE
} from '../constants/genreConstants';


const initialState = {
    loading:false,
    genres:[],
    error:'',
    currentPage:1,
    pages:0,
    numOfGenres:0
};

export const genereListReducer = (state=initialState,action) =>{
    switch (action.type) {
       case GENERE_REQUEST:
            return {...state,loading:true}
       case GENERE_FETCH:
            return {
                    ...state,
                    loading:false,
                    genres:action.payload.genres,
                    currentPage:action.payload.currentPage,
                    pages:action.payload.pages,
                    numOfGenres:action.payload.numOfGenres
                   }
        case GENERE_CREATE:
            return{
                    ...state,
                    loading:false,
                    genres:[...state.genres,action.payload.genres],
                    numOfGenres:state.numOfGenres + 1,
                    pages:action.payload.pages
                  }
        case GENERE_DELETE:
            return {
                ...state,
                loading:false,
                genres:[...state.genres.filter(data=>data._id !== action.payload._id)],
                numOfGenres:state.numOfGenres - 1,
                pages:action.payload.pages
            }                         
        case GENERE_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    
        case GENERE_RESET:
            return{
                ...state,
                loading:false,
                error:''
            }
        case GENERE_CURRENTPAGE:
            return{
                ...state,
                loading:false,
                currentPage:state.currentPage + 1
            }
        default:
            return state;
    }
}