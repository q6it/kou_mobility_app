import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    FormHelperText,
    FormControl,
} from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(Boolean);
    const [helperText, setHelperText] = useState('Choose wisely');

    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login({ email, password });

            if (currentUser) navigate('/');
        } catch (error) {
            setError(true);
            setHelperText('Something went wrong');
        }
    };

    const paperStyle = { padding: '20px', height: '70vh', width: 490, margin: '20px auto' };
    const fieldStyle = { mt: 1 };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} error={error}>
                <Grid container>
                    <Paper elevation={10} style={paperStyle}>
                        <Typography variant="h2" sx={{ textAlign: 'center' }}>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            placeholder="Enter email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            sx={fieldStyle}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            sx={fieldStyle}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Login
                        </Button>
                        {error && <FormHelperText>{helperText}</FormHelperText>}

                        <Typography sx={{ mt: 4, textAlign: 'center' }}>
                            {' '}
                            Don&apos;t have an account ?<Link to="/sign-up"> Sign up</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </FormControl>
        </form>
    );
};

export default LoginForm;
