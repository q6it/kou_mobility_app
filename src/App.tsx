import { BrowserRouter } from 'react-router-dom';

import { Grid } from '@mui/material';

import Router from './router';

import AuthProvider from './context/AuthContext';

function App() {
    return (
        <div className="App">
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <BrowserRouter>
                    <AuthProvider>
                        <Router />
                    </AuthProvider>
                </BrowserRouter>
            </Grid>
        </div>
    );
}

export default App;
