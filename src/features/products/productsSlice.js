import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.list = action.payload;
        },
        addProduct: (state, action) => {
            state.list.push(action.payload);
        },
        editProduct: (state, action) => {
            const index = state.list.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.list = state.list.filter(product => product.id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
