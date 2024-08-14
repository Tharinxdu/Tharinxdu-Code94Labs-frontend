import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Add, Edit, Delete, Star, StarBorder, ExitToApp } from '@mui/icons-material'; // Import ExitToApp icon for logout
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productsSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { logout } from '../features/auth/authSlice'; // Import the logout action
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading, error } = useSelector((state) => state.products);
    const favorites = useSelector((state) => state.favorites.list || []);
    const user = useSelector((state) => state.auth.user); // Get user info from auth state
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleEditProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDeleteProductClick = (id) => {
        setProductIdToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteProduct(productIdToDelete));
        setOpenDeleteDialog(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleToggleFavorite = (productId) => {
        dispatch(toggleFavorite(productId));
    };

    const handleToggleShowFavorites = () => {
        setShowFavorites((prev) => !prev);
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchError("Search term cannot be empty.");
            return;
        }
        setSearchError("");  // Clear any previous errors

        navigate(`/search/${searchTerm.trim()}`);  // Navigate to the search results page with the search term
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/login'); // Redirect to the login page
    };

    const filteredProducts = products.filter((product) => (showFavorites ? favorites.includes(product._id) : true));

    return (
        <Container sx={{ mt: 4 }}>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}

            {/* Top bar with User Info and Action Buttons */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Grid item>
                    <Typography variant="h4" component="h1" color="textPrimary" fontWeight="bold">
                        PRODUCTS
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container alignItems="center">
                        {user && (
                            <>
                                <Typography variant="subtitle1" color="textPrimary" sx={{ mr: 2 }}>
                                    {user.username} {/* Display the logged-in user's username */}
                                </Typography>
                                <IconButton color="primary" onClick={handleLogout}>
                                    <ExitToApp /> {/* Logout icon */}
                                </IconButton>
                            </>
                        )}
                        <Avatar src="" alt="Admin" sx={{ bgcolor: '#001EB9', width: 40, height: 40 }} />
                    </Grid>
                </Grid>
            </Grid>

            {/* Search Bar and Action Buttons */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for products"
                        size="medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ backgroundColor: '#F7F7F7' }}
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
                <Grid item>
                    <Button variant="contained" color="primary" startIcon={<Add />} sx={{ ml: 2 }} onClick={handleAddProduct}>
                        New Product
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={showFavorites ? <Star /> : <StarBorder />}
                        sx={{ ml: 2 }}
                        onClick={handleToggleShowFavorites}
                    >
                        {showFavorites ? 'Show All' : 'View Favorites'}
                    </Button>
                </Grid>
            </Grid>

            {searchError && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {searchError}
                </Typography>
            )}

            {/* Products Table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2" color="primary" fontWeight="bold">SKU</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" color="primary" fontWeight="bold">IMAGE</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" color="primary" fontWeight="bold">PRODUCT NAME</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" color="primary" fontWeight="bold">PRICE</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle2" color="primary" fontWeight="bold">ACTIONS</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>
                                <Avatar variant="square" src={`http://localhost:5000${product.mainImage}`} alt={product.name} sx={{ width: 56, height: 56 }} />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => handleEditProduct(product._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="primary" onClick={() => handleDeleteProductClick(product._id)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="primary" onClick={() => handleToggleFavorite(product._id)}>
                                    {favorites.includes(product._id) ? <Star /> : <StarBorder />}
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <DeleteConfirmationDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default ProductsPage;
