export type ColumnAlign = "left" | "center" | "right";

export interface Column<TRow extends Record<string, unknown> = Record<string, unknown>> {
    key: string & keyof TRow;
    label: string;
    align?: ColumnAlign;
    render?: (value: TRow[keyof TRow], row: TRow) => React.ReactNode;
}

export interface ReusableTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
    columns: Column<TRow>[];
    data: TRow[];
    pageSize?: number;
    caption?: string;
    emptyMessage?: string;
}
export default function ReusableTable<TRow extends Record<string, unknown>>({
    columns,
    data,
    caption,
    emptyMessage = "No records found.",
}: ReusableTableProps<TRow>) {

    const rows: TRow[] = data;

    const alignClass = (align?: ColumnAlign): string => {
        if (align === "right") return "text-right";
        if (align === "center") return "text-center";
        return "text-left";
    };

    return (
        <div className="font-sans">
            {caption && (
                <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-4">{caption}</h2>
            )}

            <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                {columns.map((col) => (
                                    <th
                                        key={String(col.key)}
                                        className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap ${alignClass(col.align)}`}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-5 py-16 text-center text-slate-400 text-sm"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-indigo-50/50 transition-colors duration-100  h-27.5">
                                        {columns.map((col) => (
                                            <td
                                                key={String(col.key)}
                                                className={`px-5 py-3.5 text-slate-700 ${alignClass(col.align)}`}
                                            >
                                                {col.render
                                                    ? col.render(row[col.key], row)
                                                    : String(row[col.key] ?? "—")}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}