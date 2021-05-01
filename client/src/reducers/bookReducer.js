import {
BOOK_CREATE,
BOOK_FETCH,
BOOK_DELETE,
BOOK_FAILED,
BOOK_REQUEST,
BOOK_RESET,
BOOK_EDIT,
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
SINGLE_BOOK_FAIL,
SINGLE_BOOK_COMMENT
} from '../constants/bookConstants';



const initialState = {
    loading:false,
    books:[],
    error:'',
    currentPage:1,
    pages:0,
    numOfBooks:0
};

export const booksStoreReducer = (state=initialState,action) =>{
    switch (action.type) {
       case BOOK_REQUEST:
            return {...state,loading:true}
       case BOOK_FETCH:
            return {
                    ...state,
                    loading:false,
                    books:action.payload.books,
                    currentPage:action.payload.currentPage,
                    pages:action.payload.pages,
                    numOfBooks:action.payload.numOfBooks
                   }
        case BOOK_CREATE:
            return{
                    ...state,
                    loading:false,
                    books:[...state.books,action.payload.books],
                    numOfBooks:state.numOfBooks + 1,
                    pages:action.payload.pages
                  }
        case BOOK_EDIT:
        	return{
        		...state,
        		loading:false,
        		books:[...state.books.map((book)=>(book._id === action.payload._id ? action.payload : book))]
        	}
        case BOOK_DELETE:
            return {
                ...state,
                loading:false,
                books:[...state.books.filter(data=>data._id !== action.payload._id)],
                numOfBooks:state.numOfBooks - 1,
                pages:action.payload.pages
            }                         
        case BOOK_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    
        case BOOK_RESET:
            return{
                ...state,
                loading:false,
                error:''
            }
        default:
            return state;
    }
}


export const editorsBookReducer = (state={},action) =>{
    switch(action.type){
        case EDITORS_BOOKS_REQUEST:
            return {loading:true}
        case EDITORS_BOOKS_SUCCESS:
            return {loading:false,editorsbook:action.payload.book}
        case EDITORS_BOOKS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;                     
    }
}

export const newArrivalsReducer = (state={},action) =>{
    switch(action.type){
        case NEWARRIVAL_REQUEST:
            return {loading:true}
        case NEWARRIVAL_SUCCESS:
            return {loading:false,newarrival:action.payload.book}
        case NEWARRIVAL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;                     
    }
}

export const classicsBookReducer = (state={},action) =>{
    switch(action.type){
        case CLASSICS_BOOKS_REQUEST:
            return {loading:true}
        case CLASSICS_BOOKS_SUCCESS:
            return {loading:false,classics:action.payload}
        case CLASSICS_BOOKS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;                     
    }
}

export const singleBookReducer = (state={},action) =>{
    switch(action.type){
        case SINGLE_BOOK_REQUEST:
            return {loading:true}
        case SINGLE_BOOK_SUCCESS:
            return {loading:false,book:action.payload.book,similarbooks:action.payload.similar}
        case SINGLE_BOOK_FAIL:
            return {loading:false,error:action.payload}
        case SINGLE_BOOK_COMMENT:
            return{
                ...state,
                loading:false,
                book:{
                    ...state.book,
                    ...state.book.comments.unshift(action.payload)
                }
            }
        default:
            return state;                     
    }
}