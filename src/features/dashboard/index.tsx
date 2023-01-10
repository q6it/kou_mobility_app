import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

import LogoutIcon from '@mui/icons-material/Logout';

import { Button, Typography, Box } from '@mui/material';

import { sendCommand } from './api';
import { useAuth } from '../../context/AuthContext';
import { db } from '../auth/Auth';

import CodeInput from './CodeInput';
import Map from './Map';
import Vehicle from './Vehicle';

const Dashboard = () => {
    const [activeVehicle, setActiveVehicle] = useState<any>(null);

    const [vehicleOn, setVehicleOn] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [mapsLoading, setMapsLoading] = useState(true);

    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {}
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const command = event.target.checked ? 'START' : 'STOP';

        try {
            setLoading(true);

            setVehicleOn(event.target.checked);

            await sendCommand('send-commands', currentUser?.accessToken!, {
                command,
                vehicleId: activeVehicle.code,
            });

            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email?.length === 0) navigate('/login');
    }, []);

    useEffect(() => {
        async function onMount() {
            const usersRef = doc(db, 'users', currentUser?.uid);

            const user = await getDoc(usersRef);

            if (user.exists()) {
                const userData = user.data();
                setUserData(userData as any);
            }
        }

        if (currentUser) onMount();
    }, [currentUser, loading]);

    useEffect(() => {
        async function onMount() {
            const vehicleId = userData?.activeVehicle;

            const vehicleRef = doc(db, 'vehicles', vehicleId);

            const vehicle = await getDoc(vehicleRef);

            if (vehicle.exists()) {
                const vehicleData = vehicle.data();
                setActiveVehicle(vehicleData as any);
            }
        }

        if (userData?.activeVehicle) onMount();
    }, [userData]);

    if (!activeVehicle) return <CodeInput loading={loading} setLoading={setLoading} />;

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
                <Box
                    sx={{
                        m: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2',
                    }}
                >
                    <Typography>
                        Hello user <b>{currentUser?.email}</b>
                    </Typography>

                    <Button onClick={handleLogout}>
                        <LogoutIcon /> Logout
                    </Button>
                </Box>
                {activeVehicle && (
                    <>
                        <Map
                            mapsLoading={mapsLoading}
                            setMapsLoading={setMapsLoading}
                            vehicleLocation={activeVehicle.location}
                        />

                        <Vehicle
                            name={activeVehicle.name}
                            odometer={activeVehicle.odometer}
                            battery={activeVehicle.soc}
                            handleChange={handleChange}
                            vehicleOn={vehicleOn}
                            loading={loading}
                            status={activeVehicle.poweredOn}
                        />
                    </>
                )}
            </Box>
        </>
    );
};

export default Dashboard;
