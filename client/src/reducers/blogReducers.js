import {
BLOG_CREATE,
BLOG_FETCH,
BLOG_DELETE,
BLOG_FAILED,
BLOG_REQUEST,
BLOG_RESET,
BLOG_EDIT,
BLOG_CURRENTPAGE,
GET_DETAILS_BLOG_REQUEST,
GET_DETAILS_BLOG_SUCCESS,
GET_DETAILS_BLOG_FAIL,
GET_DETAILS_BLOG_RESET
} from '../constants/blogConstants';



const initialState = {
    loading:false,
    blogs:[],
    error:'',
    currentPage:1,
    pages:0,
    numOfBlogs:0
};

export const blogListReducer = (state=initialState,action) =>{
    switch (action.type) {
       case BLOG_REQUEST:
            return {...state,loading:true}
       case BLOG_FETCH:
            return {
                    ...state,
                    loading:false,
                    blogs:action.payload.blogs,
                    currentPage:action.payload.currentPage,
                    pages:action.payload.pages,
                    numOfBlogs:action.payload.numOfBlogs
                   }
        case BLOG_CREATE:
            return{
                    ...state,
                    loading:false,
                    blogs:[...state.blogs,action.payload.blogs],
                    numOfBlogs:state.numOfBlogs + 1,
                    pages:action.payload.pages
                  }
        case BLOG_EDIT:
        	return{
        		...state,
        		loading:false,
        		blogs:[...state.blogs.map((blog)=>(blog._id === action.payload._id ? action.payload : blog))]
        	}
        case BLOG_DELETE:
            return {
                ...state,
                loading:false,
                blogs:[...state.blogs.filter(data=>data._id !== action.payload._id)],
                numOfBlogs:state.numOfBlogs - 1,
                pages:action.payload.pages
            }                         
        case BLOG_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    
        case BLOG_RESET:
            return{
                ...state,
                loading:false,
                error:''
            }
        case BLOG_CURRENTPAGE:
            return{
                ...state,
                loading:false,
                currentPage:state.currentPage + 1
            }
        default:
            return state;
    }
}


export const blogdetailsReducer = (state={},action) =>{
    switch(action.type){
        case GET_DETAILS_BLOG_REQUEST:
            return {loading:true}
        case GET_DETAILS_BLOG_SUCCESS:
            return {loading:false,bloginfo:action.payload}
        case GET_DETAILS_BLOG_FAIL:
            return {loading:false,error:action.payload}
        case GET_DETAILS_BLOG_RESET:
            return {}
        default:
            return state;                     
    }
}