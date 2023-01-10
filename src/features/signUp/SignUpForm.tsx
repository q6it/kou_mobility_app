import { useState } from 'react';

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
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { signUp } = useAuth();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            signUp({ email, password });

            navigate('/login');
        } catch (error) {
            setError(true);
            setHelperText('Failed to create an account');
        }

        setLoading(false);
    };

    const paperStyle = { padding: '20px', height: '70vh', width: 490, margin: '20px auto' };
    const fieldStyle = { mt: 1 };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} error={error}>
                <Grid container>
                    <Paper elevation={10} sx={paperStyle}>
                        <Typography variant="h2" sx={{ textAlign: 'center' }}>
                            Sign up
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
                            disabled={loading}
                            color="primary"
                            variant="contained"
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Sign up
                        </Button>
                        {error && <FormHelperText>{helperText}</FormHelperText>}
                    </Paper>
                </Grid>
            </FormControl>
        </form>
    );
};

export default SignUpForm;
