import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                <Route path="/edit-product/:productId" element={<EditProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;
