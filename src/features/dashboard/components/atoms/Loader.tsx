import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
