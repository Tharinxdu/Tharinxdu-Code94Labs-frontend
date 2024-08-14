import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: JSON.parse(localStorage.getItem('favorites')) || [], // Load favorites from local storage
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const productId = action.payload;
            const index = state.list.indexOf(productId);
            if (index === -1) {
                state.list.push(productId);
            } else {
                state.list.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.list)); // Save favorites to local storage
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
