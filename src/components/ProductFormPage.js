import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Box, IconButton, Avatar } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CommonDialog from '../components/CommonDialog';
import { useNavigate } from 'react-router-dom';

const ProductFormPage = ({ initialData = {}, mode = "add", onSubmit }) => {
    const [sku, setSku] = useState(initialData.sku || '');
    const [quantity, setQuantity] = useState(initialData.quantity || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [images, setImages] = useState(initialData.images || []);
    const [mainImage, setMainImage] = useState(initialData.mainImage || null);
    const [errors, setErrors] = useState({});

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData.images && initialData.images.length > 0) {
            setImages(initialData.images);
            setMainImage(initialData.images.indexOf(initialData.mainImage));
        }
    }, [initialData]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages([...files]);  // Reset the images array with the new set of files
        setMainImage(null);  // Reset the main image until the user selects one
    };

    const handleSetMainImage = (index) => {
        setMainImage(index);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        if (index === mainImage) {
            setMainImage(null);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.sku = sku ? "" : "SKU is required.";
        tempErrors.quantity = quantity ? "" : "Quantity is required.";
        tempErrors.price = price ? "" : "Price is required.";
        tempErrors.name = name ? "" : "Name is required.";
        tempErrors.description = description ? "" : "Description is required.";
        tempErrors.mainImage = mainImage !== null ? "" : "Please select a thumbnail image.";

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('sku', sku);
            formData.append('quantity', quantity);
            formData.append('price', price);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('mainImage', images[mainImage] instanceof File ? images[mainImage].name : images[mainImage]);

            images.forEach((image) => {
                if (image instanceof File) {
                    formData.append('images', image, image.name);
                } else {
                    formData.append('existingImages', image);
                }
            });

            try {
                await onSubmit(formData);
                setDialogMessage(mode === "edit" ? "Product updated successfully!" : "Product added successfully!");
                setIsError(false);
                setDialogOpen(true);
            } catch (error) {
                setDialogMessage("Failed to save product. Please try again.");
                setIsError(true);
                setDialogOpen(true);
            }
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        if (!isError) {
            navigate('/');
        }
    };

    return (
        <Container sx={{ mt: 4, position: 'relative' }}>
            {/* Common Dialog */}
            <CommonDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                title={isError ? "Error" : "Success"}
                message={dialogMessage}
                confirmButtonText="OK"
                isError={isError}
            />

            {/* Form Content */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Grid item>
                    <Typography variant="h4" component="span" color="textPrimary" fontWeight="bold">
                        PRODUCTS
                    </Typography>
                    <Typography variant="h5" component="span" color="primary" sx={{ ml: 3 }}>
                        &gt; {mode === "edit" ? "Edit" : "Add"} product
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="SKU"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        error={Boolean(errors.sku)}
                        helperText={errors.sku}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="QTY"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        inputProps={{ type: 'number' }}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        inputProps={{ type: 'number' }}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Product Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        sx={{ mb: 3 }}
                    />
                </Grid>

                <Grid item xs={12} container alignItems="center">
                    <Typography variant="body1" color="textPrimary" fontWeight="bold">
                        Product Images
                    </Typography>
                    <Button
                        component="label"
                        variant="text"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            setImages([]);  // Clear the images array
                            setMainImage(null);  // Clear the main image selection
                        }}
                    >
                        {mode === "edit" ? "Edit Images" : "Add Images"}
                        <input type="file" hidden multiple onChange={handleImageUpload} />
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="caption" display="block" color="textSecondary">
                        JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {images.map((image, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <Avatar
                                    variant="square"
                                    src={image instanceof File ? URL.createObjectURL(image) : `http://localhost:5000${image}`}
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        border: index === mainImage ? '2px solid #001EB9' : '2px solid transparent',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSetMainImage(index)}
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => handleDeleteImage(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                    {errors.mainImage && (
                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                            {errors.mainImage}
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <Box sx={{ position: 'absolute', right: 0, bottom: 0, p: 2 }}>
                <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                    {mode === "edit" ? "Save changes" : "Add product"}
                </Button>
            </Box>
        </Container>
    );
};

export default ProductFormPage;
