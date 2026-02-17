import { format } from 'date-fns';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { salesAPI } from '@/app/services/api';
import type { HeaderData, DetailData, SalesVoucher } from 'src/types';

interface SalesState {
    header: HeaderData;
    details: DetailData[];
    loading: boolean;
    error: string | null;
    submitSuccess: boolean;
    lastSubmittedVoucher: SalesVoucher | null;
}

const initialState: SalesState = {
    header: {
        vr_no: 0,
        vr_date: format(new Date(), 'yyyy-MM-dd'),
        ac_name: '',
        ac_amt: 0,
        status: 'A',
    },
    details: [
        {
            vr_no: 0,
            sr_no: 1,
            item_code: '',
            item_name: '',
            description: '',
            qty: 1,
            rate: 0,
        },
    ],
    loading: false,
    error: null,
    submitSuccess: false,
    lastSubmittedVoucher: null,
};

export const submitVoucher = createAsyncThunk(
    'sales/submitVoucher',
    async (voucher: SalesVoucher, { rejectWithValue }) => {
        try {
            const data = await salesAPI.submitVoucher(voucher);
            return { data, voucher };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit voucher');
        }
    }
);

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        updateHeader: (state, action: PayloadAction<Partial<HeaderData>>) => {
            state.header = { ...state.header, ...action.payload };
        },

        updateDetail: (state, action: PayloadAction<{ index: number; data: Partial<DetailData> }>) => {
            const { index, data } = action.payload;
            if (state.details[index]) {
                state.details[index] = { ...state.details[index], ...data };

                if (data.qty !== undefined || data.rate !== undefined) {
                    const totalAmount = state.details.reduce((sum, d) => sum + (d.qty * d.rate), 0);
                    state.header.ac_amt = totalAmount;
                }
            }
        },

        addDetailRow: (state) => {
            const newSrNo = state.details.length + 1;
            state.details.push({
                vr_no: state.header.vr_no,
                sr_no: newSrNo,
                item_code: '',
                item_name: '',
                description: '',
                qty: 1,
                rate: 0,
            });
        },

        removeDetailRow: (state, action: PayloadAction<number>) => {
            if (state.details.length > 1) {
                state.details.splice(action.payload, 1);
                state.details.forEach((detail, index) => {
                    detail.sr_no = index + 1;
                });
                const totalAmount = state.details.reduce((sum, d) => sum + (d.qty * d.rate), 0);
                state.header.ac_amt = totalAmount;
            }
        },

        resetForm: (state) => {
            state.header = {
                vr_no: 0,
                vr_date: format(new Date(), 'yyyy-MM-dd'),
                ac_name: '',
                ac_amt: 0,
                status: 'A',
            };
            state.details = [
                {
                    vr_no: 0,
                    sr_no: 1,
                    item_code: '',
                    item_name: '',
                    description: '',
                    qty: 1,
                    rate: 0,
                },
            ];
            state.submitSuccess = false;
            state.error = null;
        },

        clearSubmitStatus: (state) => {
            state.submitSuccess = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitVoucher.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.submitSuccess = false;
            })
            .addCase(submitVoucher.fulfilled, (state, action) => {
                state.loading = false;
                state.submitSuccess = true;
                state.lastSubmittedVoucher = action.payload.voucher;
            })
            .addCase(submitVoucher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    updateHeader,
    updateDetail,
    addDetailRow,
    removeDetailRow,
    resetForm,
    clearSubmitStatus,
} = salesSlice.actions;

export default salesSlice.reducer;
