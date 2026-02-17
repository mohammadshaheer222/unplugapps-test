import React, { useRef } from 'react';

import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';

import { Button } from '@/components/elements';

import type { SalesVoucher } from '@/types';

interface PrintVoucherProps {
    voucher: SalesVoucher | null;
}

export const PrintVoucher: React.FC<PrintVoucherProps> = ({ voucher }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    if (!voucher) {
        return null;
    }

    const { header_table, detail_table } = voucher;

    return (
        <div className="mt-8">
            <div className="flex justify-center mb-4 no-print">
                <Button
                    variant="primary"
                    onClick={handlePrint}
                    className="flex items-center gap-2 text-lg px-8 py-3"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Voucher
                </Button>
            </div>

            <div ref={componentRef} className="bg-white p-8 max-w-5xl mx-auto shadow-2xl rounded-lg">
                <div className="text-center border-b-4 border-primary-600 pb-6 mb-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">SALES VOUCHER</h1>
                    <p className="text-slate-600">UnplugApps Sales Management System</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-sm text-slate-600">Voucher No:</p>
                        <p className="text-2xl font-bold text-primary-700">{header_table.vr_no}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-600">Date:</p>
                        <p className="text-xl font-semibold text-slate-800">
                            {format(new Date(header_table.vr_date), 'dd MMM yyyy')}
                        </p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-200">
                    <p className="text-sm text-slate-600 mb-1">Account Name:</p>
                    <p className="text-2xl font-bold text-slate-800">{header_table.ac_name}</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Items Detail</h2>
                    <table className="w-full border-collapse border-2 border-slate-300">
                        <thead>
                            <tr className="bg-linear-to-r from-slate-700 to-slate-800 text-white">
                                <th className="border border-slate-300 px-4 py-3 text-left">Sr</th>
                                <th className="border border-slate-300 px-4 py-3 text-left">Item Code</th>
                                <th className="border border-slate-300 px-4 py-3 text-left">Item Name</th>
                                <th className="border border-slate-300 px-4 py-3 text-left">Description</th>
                                <th className="border border-slate-300 px-4 py-3 text-right">Qty</th>
                                <th className="border border-slate-300 px-4 py-3 text-right">Rate</th>
                                <th className="border border-slate-300 px-4 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail_table.map((detail, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                    <td className="border border-slate-300 px-4 py-3">{detail.sr_no}</td>
                                    <td className="border border-slate-300 px-4 py-3 font-medium">{detail.item_code}</td>
                                    <td className="border border-slate-300 px-4 py-3">{detail.item_name}</td>
                                    <td className="border border-slate-300 px-4 py-3 text-slate-600">{detail.description}</td>
                                    <td className="border border-slate-300 px-4 py-3 text-right">{detail.qty}</td>
                                    <td className="border border-slate-300 px-4 py-3 text-right">₹{detail.rate.toFixed(2)}</td>
                                    <td className="border border-slate-300 px-4 py-3 text-right font-semibold">
                                        ₹{(detail.qty * detail.rate).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-linear-to-r from-green-100 to-emerald-100 font-bold">
                                <td colSpan={6} className="border border-slate-300 px-4 py-4 text-right text-lg">
                                    GRAND TOTAL:
                                </td>
                                <td className="border border-slate-300 px-4 py-4 text-right text-xl text-green-700">
                                    ₹{header_table.ac_amt.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="mt-12 pt-6 border-t-2 border-slate-300">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-slate-600 mb-8">Prepared By:</p>
                            <div className="border-t-2 border-slate-400 pt-2">
                                <p className="text-sm font-medium">Signature</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-600 mb-8">Authorized By:</p>
                            <div className="border-t-2 border-slate-400 pt-2">
                                <p className="text-sm font-medium">Signature</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${header_table.status === 'A' ? 'bg-green-100 text-green-800' :
                        header_table.status === 'I' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        Status: {header_table.status === 'A' ? 'Active' : header_table.status === 'I' ? 'Inactive' : 'Cancelled'}
                    </span>
                </div>
            </div>
        </div>
    );
};
