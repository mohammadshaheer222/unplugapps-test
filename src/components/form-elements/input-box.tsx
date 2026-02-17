interface InputBoxProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'password' | 'number' | 'date';
    error?: string;
    showLabel?: boolean;
    wrapperClass?: string;
    inputClass?: string;
    readOnly?: boolean;
}

export default function Inputbox({
    label = "First name",
    placeholder,
    value,
    onChange,
    type = 'text',
    error,
    showLabel = true,
    wrapperClass = "",
    inputClass = "",
    readOnly = false,
}: InputBoxProps) {

    return (
        <div className={`flex flex-col w-full gap-0.5 ${wrapperClass}`}>
            {showLabel && <p className="font-medium text-xs leading-4.5">{label}</p>}
            <div className="relative">
                <input
                    type={type}
                    className={`border border-gray-200 w-full px-4 py-2 focus:border-black focus:outline-none transition-all duration-200 placeholder:text-sm h-12 rounded-2xl ${error ? "border-red-500" : "border-white-light"
                        } ${readOnly ? "bg-gray-50 cursor-not-allowed text-gray-500 focus:border-gray-200 caret-transparent" : "bg-white"} ${inputClass}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
            )}
        </div>
    )
}