import { useState } from "react";

import { DetailSection } from "./sections/detail";
import { HeaderSection } from "./sections/header";
import PageHeader from "@/components/elements/page-header"
import { Button, Column, Row } from "@/components/elements";

import { clearSubmitStatus, resetForm, submitVoucher } from "@/store/slices/salesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";

import type { FormErrors, SalesVoucher } from "@/types";

import { validateVoucher } from "@/utils/validation";
import { PrintVoucher } from "./sections/print";

const PageContent = () => {
    const dispatch = useAppDispatch();
    const { header, details, loading, submitSuccess, lastSubmittedVoucher } = useAppSelector(
        (state) => state.sales
    );
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleSubmit = async () => {
        const voucher: SalesVoucher = {
            header_table: {
                ...header,
                vr_no: Number(header.vr_no),
            },
            detail_table: details.map((detail) => ({
                ...detail,
                vr_no: Number(header.vr_no),
            })),
        };

        const { isValid, errors } = validateVoucher(voucher);

        if (!isValid) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});

        try {
            await dispatch(submitVoucher(voucher)).unwrap();
        } catch (err) {
            console.error('Submission failed:', err);
        }
    };

    const handleReset = () => {
        dispatch(resetForm());
        setFormErrors({});
    };

    const handleNewEntry = () => {
        dispatch(clearSubmitStatus());
        handleReset();
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <Column className="max-w-7xl mx-auto">
                <PageHeader
                    title="Sales Entry System"
                    subtitle="Manage your sales vouchers with ease"
                />
                {!submitSuccess ? (
                    <Column>
                        <Column>
                            <HeaderSection errors={formErrors.header} />
                            <DetailSection errors={formErrors.details} />
                        </Column>
                        <Row>
                            <Button
                                variant="primary"
                                onClick={handleReset}
                                className="flex items-center gap-2"
                            >
                                Reset Form
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleSubmit}
                                isLoading={loading}
                                className="flex items-center gap-2 text-lg px-10"
                            >
                                Submit Voucher
                            </Button>
                        </Row>
                    </Column>
                ) : (
                    <>
                        <div className="mb-8 p-6 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl animate-slide-up">
                            <div>
                                <h2 className="text-2xl font-bold text-green-800">Voucher Submitted Successfully!</h2>
                                <p className="text-green-700">Your sales voucher has been saved to the database.</p>
                            </div>
                        </div>
                        <PrintVoucher voucher={lastSubmittedVoucher} />
                        <div className="mt-8 flex justify-center">
                            <Button
                                variant="primary"
                                onClick={handleNewEntry}
                                className="flex items-center gap-2 text-lg px-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Entry
                            </Button>
                        </div>
                    </>
                )}
            </Column>
        </div>
    )
}

export default PageContent