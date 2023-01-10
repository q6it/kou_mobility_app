import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import { Box } from '@mui/material';

import Loader from './atoms/Loader';

interface MapProps {
    mapsLoading: boolean;
    setMapsLoading: Dispatch<SetStateAction<boolean>>;
    vehicleLocation: {
        lat: number;
        lon: number;
    };
}

const Map = ({ mapsLoading, setMapsLoading, vehicleLocation }: MapProps) => {
    const [currentPosition, setCurrentPosition] = useState({} as { lat: number; lng: number });
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

    useEffect(() => {
        if (isLoaded) setMapsLoading(false);
    }, [isLoaded]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    if (mapsLoading) return <Loader />;

    return (
        <Box sx={{ mt: 2 }}>
            {currentPosition?.lat && (
                <GoogleMap
                    zoom={14}
                    center={currentPosition}
                    mapContainerStyle={{ width: '100%', height: '70vh' }}
                >
                    <Marker
                        icon={
                            'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                        }
                        position={currentPosition}
                        label="You"
                    />
                    <Marker
                        position={{ lng: vehicleLocation.lon, lat: vehicleLocation.lat }}
                        label="Vehicle"
                    />
                </GoogleMap>
            )}
        </Box>
    );
};

export default Map;
