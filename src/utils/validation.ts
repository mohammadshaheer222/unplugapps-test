import type { DetailData, FormErrors, SalesVoucher } from "@/types";

export const validateVoucher = (voucher: SalesVoucher): { isValid: boolean; errors: FormErrors } => {
    const errors: FormErrors = {};
    let isValid = true;

    const headerErrors: FormErrors['header'] = {};
    if (!voucher.header_table.vr_no) {
        headerErrors.vr_no = 'Voucher No is required';
        isValid = false;
    }
    if (!voucher.header_table.ac_name?.trim()) {
        headerErrors.ac_name = 'Account Name is required';
        isValid = false;
    }
    if (voucher.header_table.ac_amt <= 0) {
        headerErrors.ac_amt = 'Total Amount must be greater than 0';
        isValid = false;
    }

    if (Object.keys(headerErrors).length > 0) {
        errors.header = headerErrors;
    }

    const detailsErrors: FormErrors['details'] = {};
    voucher.detail_table.forEach((detail: DetailData, index: number) => {
        const rowErrors: { item_code?: string; qty?: string; rate?: string } = {};

        if (!detail.item_code) {
            rowErrors.item_code = 'Item is required';
            isValid = false;
        }
        if (detail.qty <= 0) {
            rowErrors.qty = 'Qty > 0';
            isValid = false;
        }
        if (detail.rate < 0) {
            rowErrors.rate = 'Rate >= 0';
            isValid = false;
        }

        if (Object.keys(rowErrors).length > 0) {
            detailsErrors[index] = rowErrors;
        }
    });

    if (Object.keys(detailsErrors).length > 0) {
        errors.details = detailsErrors;
    }

    return { isValid, errors };
};
