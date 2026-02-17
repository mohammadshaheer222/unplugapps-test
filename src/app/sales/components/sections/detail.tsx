import React, { useEffect } from 'react';

import FeatherIcon from '@/assets/feather-icon';
import { InputBox, SelectBox } from '@/components/form-elements';
import { Button, Card, Column, Row, Table } from '@/components/elements';
import type { Column as TableColumn } from '@/components/elements/table';

import type { ItemMaster } from '@/types';
import type { FormErrors } from '@/types';
import { fetchItems } from '@/store/slices/itemsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { addDetailRow, removeDetailRow, updateDetail } from '@/store/slices/salesSlice';

export interface DetailItem extends Record<string, unknown> {
    sr_no: number;
    item_code: string;
    item_name: string;
    description: string;
    qty: number;
    rate: number;
}

interface DetailSectionProps {
    errors?: FormErrors['details'];
}

export const DetailSection: React.FC<DetailSectionProps> = ({ errors }) => {
    const dispatch = useAppDispatch();
    const details = useAppSelector((state) => state.sales.details);
    const items = useAppSelector((state) => state.items.items);
    const itemsLoading = useAppSelector((state) => state.items.loading);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleDetailChange = (index: number, field: string, value: string | number) => {
        const updates = { [field]: value };
        if (field === 'item_code') {
            const selectedItem = items.find(item => item.item_code === value);
            if (selectedItem) {
                updates.item_name = selectedItem.item_name;
            }
        }
        dispatch(updateDetail({ index, data: updates }));
    };

    const handleAddRow = () => {
        dispatch(addDetailRow());
    };

    const handleRemoveRow = (index: number) => {
        if (details.length > 1) {
            dispatch(removeDetailRow(index));
        }
    };

    const columns: TableColumn<DetailItem>[] = [
        {
            key: 'sr_no',
            label: 'Sr No',
            align: 'center',
        },
        {
            key: 'item_code',
            label: 'Item Code',
            render: (_val, row: any) => {
                const index = details.indexOf(row);
                return (
                    <SelectBox<ItemMaster>
                        value={row.item_code}
                        onChange={(value) => handleDetailChange(index, 'item_code', value)}
                        options={items}
                        labelKey="item_code"
                        valueKey="item_code"
                        disabled={itemsLoading}
                        showLabel={false}
                        error={errors?.[index]?.item_code}
                        wrapperClass="min-w-[180px]"
                    />
                );
            },
        },
        {
            key: 'item_name',
            label: 'Item Name',
            render: (_val, row: any) => (
                <InputBox
                    readOnly
                    showLabel={false}
                    value={row.item_name}
                    inputClass="py-3 flex-1"
                    placeholder="Auto-filled"
                />
            ),
        },
        {
            key: 'description',
            label: 'Description',
            render: (_val, row: any) => {
                const index = details.indexOf(row);
                return (
                    <InputBox
                        showLabel={false}
                        inputClass="py-3 flex-1"
                        value={row.description}
                        placeholder="Enter description"
                        onChange={(value: string) => handleDetailChange(index, 'description', value)}
                        wrapperClass="min-w-[200px]"
                    />
                );
            },
        },
        {
            key: 'qty',
            label: 'Qty',
            align: 'center',
            render: (_val, row: any) => {
                const index = details.indexOf(row);
                return (
                    <InputBox
                        type='number'
                        showLabel={false}
                        inputClass="py-3 flex-1"
                        value={row.qty}
                        onChange={(value: string) => handleDetailChange(index, 'qty', value)}
                        error={errors?.[index]?.qty}
                        wrapperClass="min-w-[100px]"
                    />
                );
            },
        },
        {
            key: 'rate',
            label: 'Rate',
            align: 'right',
            render: (_val, row: any) => {
                const index = details.indexOf(row);
                return (
                    <InputBox
                        type='number'
                        showLabel={false}
                        inputClass="py-3 flex-1"
                        value={row.rate}
                        onChange={(value: string) => handleDetailChange(index, 'rate', value)}
                        error={errors?.[index]?.rate}
                        wrapperClass="min-w-[100px]"
                    />
                );
            },
        },
        {
            key: 'qty',
            label: 'Amount',
            align: 'right',
            render: (_val, row: any) => (
                <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                    ₹{(row.qty * row.rate).toFixed(2)}
                </span>
            ),
        },
        {
            key: 'sr_no',
            label: 'Action',
            align: 'center',
            render: (_val, row: any) => {
                const index = details.indexOf(row);
                return (
                    <Button
                        onClick={() => handleRemoveRow(index)}
                        disabled={details.length === 1}
                        className='border-none! disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                        <FeatherIcon
                            icon="trash"
                            iconStrokeColor='red'
                            iconWidth={16}
                            iconHeight={16}
                        />
                    </Button>
                );
            },
        },
    ];

    const tableProps = {
        columns,
        data: details as unknown as DetailItem[],
        emptyMessage: "No items added yet.",
    };

    return (
        <Card title="Detail Items">
            <Table {...tableProps} />
            <Row className="justify-between items-center">
                <Button
                    variant="secondary"
                    onClick={handleAddRow}
                    className="flex items-center gap-2"
                >
                    <FeatherIcon
                        icon="plus"
                        iconStrokeColor='white'
                        iconWidth={16}
                        iconHeight={16}
                    />
                    Add New Row
                </Button>
                <Column className="text-right gap-0!">
                    <p className="text-sm text-slate-600 mb-1">Total Rows: <span className="font-bold text-slate-800">{details.length}</span></p>
                    <p className="text-lg font-bold text-primary-600">
                        Grand Total: ₹{details.reduce((sum, d) => sum + (d.qty * d.rate), 0).toFixed(2)}
                    </p>
                </Column>
            </Row>
        </Card>
    );
};
