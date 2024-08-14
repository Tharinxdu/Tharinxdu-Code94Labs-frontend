import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductFormPage from '../components/ProductFormPage';
import { fetchProductById, updateProduct } from '../features/products/productsSlice';

const EditProductPage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) =>
        state.products.products.find((p) => p._id === productId)
    );
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!product) {
            // Fetch the product if it's not already in the Redux store
            dispatch(fetchProductById(productId))
                .unwrap()
                .then((data) => {
                    setInitialData({
                        sku: data.sku,
                        quantity: data.quantity,
                        name: data.name,
                        description: data.description,
                        images: data.images,
                        mainImage: data.mainImage,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            // If product is already in the store, use it
            setInitialData({
                sku: product.sku,
                quantity: product.quantity,
                name: product.name,
                description: product.description,
                images: product.images,
                mainImage: product.mainImage,
            });
            setLoading(false);
        }
    }, [dispatch, productId, product]);

    const handleSubmit = (formData) => {
        dispatch(updateProduct({ id: productId, product: formData }))
            .unwrap()
            .then(() => {
                // Handle success (e.g., navigate away or show a success message)
            })
            .catch((err) => {
                // Handle errors
                console.error(err);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ProductFormPage
            initialData={initialData}
            mode="edit"
            onSubmit={handleSubmit}
        />
    );
};

export default EditProductPage;
