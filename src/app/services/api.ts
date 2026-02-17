import axios from 'axios';

import { API_BASE_URL } from '@/constants';
import type { HeaderData, DetailData, ItemMaster, SalesVoucher } from 'src/types';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const salesAPI = {
    getHeaders: async (): Promise<HeaderData[]> => {
        const response = await api.get('/header');
        return response.data;
    },

    getDetails: async (): Promise<DetailData[]> => {
        const response = await api.get('/detail');
        return response.data;
    },

    getItems: async (): Promise<ItemMaster[]> => {
        const response = await api.get('/item');
        return response.data;
    },

    submitVoucher: async (voucher: SalesVoucher): Promise<any> => {
        const response = await api.post('/header/multiple', voucher);
        console.log(response, "response")
        return response.data;
    },
};

export default api;
