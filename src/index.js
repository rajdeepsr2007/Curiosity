import React from 'react';
import ReactDOM from 'react-dom';

import { createStore , combineReducers , applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import signupReducer from './store/reducers/auth/signup';
import authReducer from './store/reducers/auth/auth';
import spacesReducer from './store/reducers/spaces/';
import questionsReducer from './store/reducers/questions';
import answersReducers from './store/reducers/answers';
import commentsReducer from './store/reducers/comments/index';

const rootReducer = combineReducers({
    signup : signupReducer,
    auth : authReducer,
    spaces : spacesReducer,
    questions : questionsReducer,
    answers : answersReducers,
    comments : commentsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( rootReducer , composeEnhancers( applyMiddleware(thunk) ) );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
