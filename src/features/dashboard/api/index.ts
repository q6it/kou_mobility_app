import axios from 'axios';

interface PairBodyType {
    vehicleCode: string;
}

const baseUrl = 'https://europe-west3-coscooter-eu-staging.cloudfunctions.net';

export const get = (path: string) => {
    return axios.get(`${baseUrl}/${path}`);
};

export const pairScooter = (path: string, apiKey: string, data: PairBodyType) => {
    return axios.post(`${baseUrl}/${path}?apiKey=${apiKey}`, data);
};
export const deleteScooter = (path: string, apiKey: string, data: any) => {
    return axios.delete(`${baseUrl}/${path}?apiKey=${apiKey}`, data);
};

export const sendCommand = (path: string, apiKey: string, data: any) => {
    return axios.post(`${baseUrl}/${path}?apiKey=${apiKey}`, data);
};
