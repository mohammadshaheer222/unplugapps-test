import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    children: React.ReactNode;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = variant === 'primary' ? 'bg-white text-black border border-solid border-black rounded-2xl px-4 py-2' :
        variant === 'secondary' ? 'bg-black text-white px-4 py-2 rounded-2xl' : ""

    return (
        <button
            className={`${baseClass} ${className} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    Processing...
                </span>
            ) : children}
        </button>
    );
};
