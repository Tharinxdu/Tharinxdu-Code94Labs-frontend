import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import { Container, TextField, Button, Typography, Box, CircularProgress, Grid } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (result.type === 'auth/loginUser/fulfilled') {
            navigate('/home');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                Sign up here
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;
