import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const Card = ({ children, title, className = '' }: CardProps) => {
    return (
        <div className={`${className} flex flex-col gap-5`}>
            {title && (
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            )}
            {children}
        </div>
    );
};

export default Card;