export interface HeaderData {
    vr_no: number;
    vr_date: string;
    ac_name: string;
    ac_amt: number;
    status: 'A' | 'I';
}

export interface DetailData {
    vr_no: number;
    sr_no: number;
    item_code: string;
    item_name: string;
    description: string;
    qty: number;
    rate: number;
}

export interface ItemMaster extends Record<string, unknown> {
    item_code: string;
    item_name: string;
}

export interface SalesVoucher {
    header_table: HeaderData;
    detail_table: DetailData[];
}

export interface FormErrors {
    header?: {
        vr_no?: string;
        vr_date?: string;
        ac_name?: string;
        ac_amt?: string;
    };
    details?: {
        [key: number]: {
            item_code?: string;
            qty?: string;
            rate?: string;
        };
    };
}

export interface HeaderErrors {
    vr_no?: string;
    vr_date?: string;
    ac_name?: string;
}

export interface DetailErrors {
    item_code?: string;
    qty?: string;
    rate?: string;
}