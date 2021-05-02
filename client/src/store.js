import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import {
  authenticateReducer
} from './reducers/authReducers';

import {
	carousalListReducer
} from './reducers/carousalReducer';

import {
  genereListReducer
} from './reducers/genreReducers';

import {
  authorListReducer,
  authornamesReducer,
  authorDetailsReducer
} from './reducers/authorReducer';

import {
  blogListReducer,
  blogdetailsReducer
} from './reducers/blogReducers';


import {
  categoryBookReducer
} from './reducers/catBookReducers';

import {
  booksStoreReducer,
  editorsBookReducer,
  newArrivalsReducer,
  classicsBookReducer,
  singleBookReducer,
  searchBookReducer
} from './reducers/bookReducer'

const reducer = combineReducers({
  userLogin:authenticateReducer,
  admincarousal:carousalListReducer,
  genresList:genereListReducer,
  authorList:authorListReducer,
  authorNames:authornamesReducer,
  blogs:blogListReducer,
  blogdetails:blogdetailsReducer,
  authordetails:authorDetailsReducer,
  books:booksStoreReducer,
  newBooks:newArrivalsReducer,
  editorBooks:editorsBookReducer,
  classicBooks:classicsBookReducer,
  bookInfo:singleBookReducer,
  categorybooks:categoryBookReducer,
  searchResults:searchBookReducer
});



const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;