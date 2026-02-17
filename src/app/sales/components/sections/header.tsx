import React from 'react';

import { Badge, Card, Row } from '@/components/elements';
import { InputBox } from '@/components/form-elements';

import { updateHeader } from '@/store/slices/salesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';

import type { FormErrors } from '@/types';

interface HeaderSectionProps {
    errors?: FormErrors['header'];
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ errors }) => {
    const dispatch = useAppDispatch();
    const header = useAppSelector((state) => state.sales.header);

    const handleChange = (field: string, value: string | number) => {
        dispatch(updateHeader({ [field]: value }));
    };

    return (
        <Card title="Header Information">
            <Row>
                <InputBox
                    inputClass="py-3 flex-1"
                    label="Voucher No"
                    value={String(header.vr_no)}
                    placeholder="Enter voucher number"
                    onChange={(value: string) => handleChange('vr_no', value)}
                    error={errors?.vr_no}
                />
                <InputBox
                    type="date"
                    inputClass="py-3 flex-1"
                    label="Voucher Date"
                    value={header.vr_date}
                    onChange={(value: string) => handleChange('vr_date', value)}
                    error={errors?.vr_date}
                />
                <InputBox
                    inputClass="py-3 flex-1"
                    label="Account Name"
                    value={header.ac_name}
                    placeholder="Enter account name"
                    onChange={(value: string) => handleChange('ac_name', value)}
                    error={errors?.ac_name}
                />
                <InputBox
                    inputClass="py-3 flex-1"
                    label="Total Amount"
                    placeholder="Enter total amount"
                    value={header.ac_amt.toFixed(2)}
                    onChange={(value: string) => handleChange('ac_amt', parseFloat(value))}
                    error={errors?.ac_amt}
                    readOnly
                />
            </Row>
            <Badge />
        </Card>
    );
};
