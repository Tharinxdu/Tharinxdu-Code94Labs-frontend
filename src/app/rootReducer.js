import { combineReducers } from 'redux';
import productsReducer from '../features/products/productsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
});

export default rootReducer;
