import React, { Dispatch, SetStateAction, useState } from 'react';

import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/material';

import { pairScooter } from '../api';
import { useAuth } from '../../../context/AuthContext';

type CodeInputProps = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

function CodeInput({ loading, setLoading }: CodeInputProps) {
    const [code, setCode] = useState<any>('');
    const [error, setError] = useState<any>('');

    const { currentUser } = useAuth();

    const handleCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handlePairScooter = async () => {
        setLoading(true);
        try {
            const apiKey = currentUser?.accessToken;

            if (apiKey) {
                await pairScooter('pair', apiKey, { vehicleCode: code });
                setLoading(false);
            }
        } catch (e) {
            setError(e.response.data.message as any);
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <Container sx={{ minWidth: 300, maxWidth: 600 }}>
            <Typography sx={{ mt: 4 }} variant="subtitle1">
                Insert vehicle code here to pair it with your account:
            </Typography>

            <Box sx={{ display: 'flex' }}>
                <TextField
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    fullWidth
                    value={code}
                    onChange={handleCodeChange}
                />
                <Button
                    type="button"
                    onClick={handlePairScooter}
                    variant="outlined"
                    disabled={loading}
                >
                    Pair
                </Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Container>
    );
}

export default CodeInput;
