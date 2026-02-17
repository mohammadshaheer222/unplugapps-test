import React from 'react'

interface ColumnProps {
    children: React.ReactNode;
    className?: string;
}

const Column = ({ children, className }: ColumnProps) => {
    return (
        <div className={`flex flex-col gap-5 ${className || ''}`}>
            {children}
        </div>
    )
}

export default Column;