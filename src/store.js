import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import navReducer from './reducers/nav-bar';
import productsReducer from './reducers/products';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import { composeWithDevTools } from 'redux-devtools-extension';
import reviewsReducer from './reducers/reviews';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        nav: navReducer,
        products: productsReducer,
        reviews: reviewsReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
