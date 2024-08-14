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
        const loadProduct = async () => {
            setLoading(true); // Ensure loading state is set
            if (!product) {
                try {
                    const data = await dispatch(fetchProductById(productId)).unwrap();
                    console.log("Fetched product:", data); // Log fetched data
                    setInitialData({
                        sku: data.sku,
                        quantity: data.quantity,
                        price: data.price,
                        name: data.name,
                        description: data.description,
                        images: data.images,
                        mainImage: data.mainImage,
                    });
                } catch (err) {
                    console.error("Error fetching product:", err); // Log error
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("Product found in store:", product); // Log product from store
                setInitialData({
                    sku: product.sku,
                    quantity: product.quantity,
                    price: product.price,
                    name: product.name,
                    description: product.description,
                    images: product.images,
                    mainImage: product.mainImage,
                });
                setLoading(false);
            }
        };

        loadProduct();
    }, [dispatch, productId, product]); // Dependency array ensures this runs when product or productId changes

    const handleSubmit = (formData) => {
        dispatch(updateProduct({ id: productId, product: formData }))
            .unwrap()
            .then(() => {
                // Handle success (e.g., navigate away or show a success message)
            })
            .catch((err) => {
                // Handle errors
                console.error("Error updating product:", err);
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
