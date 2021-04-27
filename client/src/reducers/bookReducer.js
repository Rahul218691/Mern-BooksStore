import {
BOOK_CREATE,
BOOK_FETCH,
BOOK_DELETE,
BOOK_FAILED,
BOOK_REQUEST,
BOOK_RESET,
BOOK_EDIT,
BOOK_SINGLE
} from '../constants/bookConstants';



const initialState = {
    loading:false,
    books:[],
    book:{},
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
        case BOOK_SINGLE:
            return{
                ...state,
                loading:false,
                book:action.payload
            }
        default:
            return state;
    }
}

