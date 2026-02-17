import FeatherIcon from '@/assets/feather-icon';

interface SelectOption extends Record<string, unknown> {
    label: string;
    value: string | number;
}
export interface SelectBoxProps<TOption extends Record<string, unknown> = SelectOption> {
    label?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    options: TOption[];
    labelKey?: keyof TOption;
    valueKey?: keyof TOption;
    error?: string;
    showLabel?: boolean;
    wrapperClass?: string;
    selectClass?: string;
    disabled?: boolean;
}

export default function SelectBox<TOption extends Record<string, unknown> = SelectOption>({
    label = "Select",
    placeholder = "Select an option",
    value,
    onChange,
    options,
    labelKey = 'label' as keyof TOption,
    valueKey = 'value' as keyof TOption,
    error,
    showLabel = true,
    wrapperClass = "",
    selectClass = "",
    disabled = false,
}: SelectBoxProps<TOption>) {
    return (
        <div className={`relative flex flex-col w-full items-start gap-0.5 ${wrapperClass}`}>
            {showLabel && (
                <p className="font-medium text-xs leading-4.5">{label}</p>
            )}
            <div className="relative w-full">
                <select
                    value={value ?? ""}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    className={`
                        border w-full px-4 py-2 h-12 rounded-2xl
                        focus:border-black focus:outline-none
                        transition-all duration-200
                        appearance-none bg-white text-sm
                        ${value ? "text-gray-900" : "text-gray-400"}
                        ${error ? "border-red-500" : "border-gray-200"}
                        ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer"}
                        ${selectClass}
                    `}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options.map((opt) => {
                        const optValue = String(opt[valueKey] ?? '');
                        const optLabel = String(opt[labelKey] ?? '');
                        return (
                            <option key={optValue} value={optValue}>
                                {optLabel}
                            </option>
                        );
                    })}
                </select>
                <FeatherIcon
                    icon="chevron-down"
                    iconStrokeColor='black'
                    iconWidth={16}
                    iconHeight={16}
                    parentClass='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-0.5 absolute top-full left-0 z-10 whitespace-nowrap">{error}</p>
            )}
        </div>
    );
}