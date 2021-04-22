import {
CAROUSAL_CREATE,
CAROUSAL_FETCH,
CAROUSAL_EDIT,
CAROUSAL_DELETE,
CAROUSAL_FAILED,
CAROUSAL_REQUEST,
CAROUSAL_RESET
} from '../constants/carousalConstants';


const initialState = {
    loading:false,
    carousal:[],
    error:''
};

export const carousalListReducer = (state=initialState,action) =>{
    switch (action.type) {
        case CAROUSAL_REQUEST:
            return {...state,loading:true}
        case CAROUSAL_CREATE:
            return {...state,loading:false,carousal:[...state.carousal,action.payload]}
        case CAROUSAL_FETCH:
            return {...state,loading:false,carousal:action.payload} 
        case CAROUSAL_EDIT:
            return {...state,loading:false,carousal:[...state.carousal.map((carous)=>(carous._id === action.payload._id ? action.payload : carous))]}   
        case CAROUSAL_DELETE:
            return {...state,loading:false,carousal:[...state.carousal.filter(data=>data._id !== action.payload)]}     
        case CAROUSAL_FAILED:
            return {...state,loading:false,error:action.payload}        
        case CAROUSAL_RESET:
            return {...state,loading:false,error:''}   
        default:
            return state;
    }
}