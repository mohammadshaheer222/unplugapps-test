"use client"

import type { ReactNode } from "react";

interface PageHeaderProps {
    title: ReactNode;
    subtitle?: string;
    className?: string;
    subtitleClass?: string;
    as?: 'h1' | 'h2' | 'h3';
    titleClassName?: string;
    align?: 'left' | 'center' | 'right';
}

const PageHeader = ({
    title,
    subtitle,
    align = 'left',
    className = "",
    as: Tag = 'h2',
    subtitleClass = "",
    titleClassName = "",
}: PageHeaderProps) => {
    const alignmentMap = {
        left: 'text-left',
        right: 'text-right',
        center: 'text-center',
    } as const;

    return (
        <div className={`flex flex-col gap-1 ${alignmentMap[align]} ${className}`}>
            <Tag className={`text-4xl leading-tight font-bold tracking-wide capitalize text-black lg:text-6xl lg:leading-[1.05] ${titleClassName}`}>
                {title}
            </Tag>
            {subtitle && (
                <p className={`max-w-xl font-normal leading-relaxed text-gray-500 ${alignmentMap[align]} ${subtitleClass}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default PageHeader;
