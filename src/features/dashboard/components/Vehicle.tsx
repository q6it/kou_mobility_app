import React, { useEffect } from 'react';

import { Box, Card, CardContent, CardHeader, FormControlLabel, Switch } from '@mui/material';

import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import VehicleStatsText from './components/atoms/VehicleStatsText';

interface VehicleProps {
    name: string;
    odometer: number;
    battery: number;
    loading: boolean;
    vehicleOn: boolean;
    status: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function Vehicle({ name, odometer, battery, loading, status, handleChange }: VehicleProps) {
    useEffect(() => {}, [loading]);

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ mt: '20px', width: 300 }}>
                <CardHeader
                    avatar={<ElectricScooterIcon sx={{ ml: 6, fontSize: 90 }} />}
                    title={name}
                    titleTypographyProps={{ fontSize: 40, textAlign: 'left' }}
                />

                <CardContent>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={status}
                                        onChange={handleChange}
                                        name="powerSwitch"
                                        color="primary"
                                        disabled={loading}
                                    />
                                }
                                label="Off/On"
                            />
                        </Box>
                        <VehicleStatsText label="Status">{status ? 'On' : 'Off'}</VehicleStatsText>
                        <VehicleStatsText label="Battery Level">{battery}</VehicleStatsText>
                        <VehicleStatsText label="Odometer">{odometer}</VehicleStatsText>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Vehicle;
