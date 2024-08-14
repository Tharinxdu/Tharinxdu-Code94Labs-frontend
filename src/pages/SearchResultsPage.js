import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { searchProducts } from '../features/products/productsSlice';
import {Search} from "@mui/icons-material";

const SearchResultsPage = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.products);

    const [searchTerm, setSearchTerm] = useState(query);

    useEffect(() => {
        if (query) {
            dispatch(searchProducts(query));
        }
    }, [dispatch, query]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    const handleEditProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    return (
        <Container sx={{ mt: 4 }}>
            {/* Top bar with User Info and Action Buttons */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Grid item>
                    <Typography variant="h4" component="h1" color="textPrimary" fontWeight="bold">
                        PRODUCTS
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" href="/home">
                        Back to Home
                    </Button>
                </Grid>
            </Grid>

            {/* Search Bar */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for products"
                        size="medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Search />}
                        onClick={handleSearch}
                        sx={{ ml: 2 }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                {products.length} results found for '{query}'
            </Typography>

            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}

            <Box sx={{ mt: 2 }}>
                {Array.isArray(products) && products.map((product) => (
                    <Paper
                        key={product._id}
                        elevation={2}
                        sx={{
                            mb: 3,
                            p: 3,
                            borderRadius: 3,
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
                            }
                        }}
                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={1}>
                                <Typography variant="subtitle2" color="primary" sx={{ textDecoration: 'none' }}>
                                    #{product.sku}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Typography variant="h6" sx={{ textDecoration: 'none', color: '#000' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {product.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ borderRadius: 3 }}
                                    onClick={() => handleEditProduct(product._id)}
                                >
                                    View & Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default SearchResultsPage;
