"use client"

import type { ReactNode } from "react";

interface RowProps {
    children: ReactNode;
    className?: string;
}

const Row = ({ children, className = "" }: RowProps) => {
    return (
        <div className={`w-full flex flex-col gap-5 md:flex-row ${className}`}>
            {children}
        </div>
    );
};

export default Row;
