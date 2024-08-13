import { combineReducers } from 'redux';
import productsReducer from '../features/products/productsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    favorites: favoritesReducer,
});

export default rootReducer;
