import React from 'react';
import ProductFormPage from '../components/ProductFormPage';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';

const AddProductPage = () => {
    const dispatch = useDispatch();

    const handleAddProduct = async (formData) => {
        try {
            await dispatch(addProduct(formData)).unwrap();
            // Handle success, such as redirecting the user or showing a success message
            console.log('Product added successfully!');
        } catch (error) {
            // Handle error
            console.error('Failed to add product:', error);
        }
    };

    return (
        <ProductFormPage
            mode="add"
            onSubmit={handleAddProduct}  // Pass the handleAddProduct function as the onSubmit prop
        />
    );
};

export default AddProductPage;
