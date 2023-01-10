import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
    style?: {
        [key: string]: any;
    };
    label: string;
    children: React.ReactNode;
}

const VehicleStatsText = ({ style, label, children }: Props) => {
    return (
        <Box sx={{ m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={style}>
                {label}:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{children}</Typography>
        </Box>
    );
};

export default VehicleStatsText;
