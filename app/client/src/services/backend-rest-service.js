import axios from 'axios';
import * as firebase from 'firebase';
import { config } from '../config';

const instance = axios.create({
    baseURL: config.API_URL,
    headers: { accept: 'text/plain' },
});
var configAxios = {};

const login = async () => {
    let user = firebase.auth().currentUser;
    if (user) {
        let token = await user.getIdToken();
        configAxios = {
            headers: { Authorization: `Bearer ${token}` },
        };
    }
};

export const getAllLocations = async () => {
    await login();
    return instance.get('/Location', configAxios);
};

export const getAllOffers = async () => {
    await login();
    return instance.get('/Offer', configAxios);
};

export const deleteOffer = async (id) => {
    await login();
    return instance.delete('/Offer/' + id, configAxios);
};

export const getOffer = async (id) => {
    await login();
    return instance.get('/Offer/' + id, configAxios);
};
