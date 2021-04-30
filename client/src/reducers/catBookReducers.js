import {
CATBOOK_FETCH,
CATBOOK_REQUEST,
CATBOOK_FAIL,
CATBOOK_RESET
} from '../constants/catBookConstants';

const initialState = {
	books:[],
	currentPage:1,
	pages:0,
	numOfBooks:0,
	loading:false,
	error:''
}

export const categoryBookReducer = (state=initialState,action) =>{
    switch (action.type) {
    	case CATBOOK_REQUEST:
    		return{
    			...state,
    			loading:true
    		}
    	case CATBOOK_FETCH:
    		return{
    			...state,
    			loading:false,
    			books:action.payload.books,
    			currentPage:action.payload.currentPage,
    			pages:action.payload.pages,
    			numOfBooks:action.payload.catbooksCount
    		}	
    	case CATBOOK_FAIL:
    		return{
    			...state,
    			loading:false,
    			error:action.payload
    		}
    	case CATBOOK_RESET:
    		return{
    			...state,
    			loading:false,
    			error:'',
    			books:[],
    			pages:0,
    			numOfBooks:0,
    			currentPage:1
    		}	
    	default:
    		return state
    }
}

