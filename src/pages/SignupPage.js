import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../features/auth/authSlice';
import { Container, TextField, Button, Typography, Box, CircularProgress, Grid } from '@mui/material';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await dispatch(signupUser({ username, email, password }));
        if (result.type === 'auth/signupUser/fulfilled') {
            navigate('/login');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    type="text"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    fullWidth
                />
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
                    <Box sx={{ mt: 2 }}>
                        {Array.isArray(error) ? (
                            error.map((err, index) => (
                                <Typography key={index} color="error" variant="body2">
                                    {err}
                                </Typography>
                            ))
                        ) : (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                    </Box>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                Login here
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignupPage;
