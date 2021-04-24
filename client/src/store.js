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
  authorListReducer
} from './reducers/authorReducer';

const reducer = combineReducers({
  userLogin:authenticateReducer,
  admincarousal:carousalListReducer,
  genresList:genereListReducer,
  authorList:authorListReducer
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