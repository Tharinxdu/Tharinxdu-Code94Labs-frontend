import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsPage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { setToken } from './features/auth/authSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));  // Set the token in Redux store on app load
        }
    }, [dispatch]);

    const token = useSelector((state) => state.auth.token || localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<ProtectedRoute element={ProductsPage} />} />
                <Route path="/add-product" element={<ProtectedRoute element={AddProductPage} />} />
                <Route path="/edit-product/:productId" element={<ProtectedRoute element={EditProductPage} />} />
                <Route path="/search/:query" element={<ProtectedRoute element={SearchResultsPage} />} />
            </Routes>
        </Router>
    );
}

export default App;
