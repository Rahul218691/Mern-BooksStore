import {
AUTHOR_CREATE,
AUTHOR_FETCH,
AUTHOR_DELETE,
AUTHOR_FAILED,
AUTHOR_REQUEST,
AUTHOR_RESET,
AUTHOR_EDIT,
AUTHOR_CURRENTPAGE
} from '../constants/authorConstants';



const initialState = {
    loading:false,
    authors:[],
    error:'',
    currentPage:1,
    pages:0,
    numOfAuthors:0
};

export const authorListReducer = (state=initialState,action) =>{
    switch (action.type) {
       case AUTHOR_REQUEST:
            return {...state,loading:true}
       case AUTHOR_FETCH:
            return {
                    ...state,
                    loading:false,
                    authors:action.payload.authors,
                    currentPage:action.payload.currentPage,
                    pages:action.payload.pages,
                    numOfAuthors:action.payload.numOfAuthors
                   }
        case AUTHOR_CREATE:
            return{
                    ...state,
                    loading:false,
                    authors:[...state.authors,action.payload.authors],
                    numOfAuthors:state.numOfAuthors + 1,
                    pages:action.payload.pages
                  }
        case AUTHOR_EDIT:
        	return{
        		...state,
        		loading:false,
        		authors:[...state.authors.map((author)=>(author._id === action.payload._id ? action.payload : author))]
        	}
        case AUTHOR_DELETE:
            return {
                ...state,
                loading:false,
                authors:[...state.authors.filter(data=>data._id !== action.payload._id)],
                numOfAuthors:state.numOfAuthors - 1,
                pages:action.payload.pages
            }                         
        case AUTHOR_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    
        case AUTHOR_RESET:
            return{
                ...state,
                loading:false,
                error:''
            }
        case AUTHOR_CURRENTPAGE:
            return{
                ...state,
                loading:false,
                currentPage:state.currentPage + 1
            }
        default:
            return state;
    }
}