import React from "react";

export function Badge({ children, variant = "default" }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const styles = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-emerald-100 text-emerald-700",
    warn: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-indigo-100 text-indigo-700",
  };
  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function KPI({ icon: Icon, label, value, note, trend = 0 }) {
  const trendColor = trend > 0 ? "text-emerald-600" : trend < 0 ? "text-red-600" : "text-slate-500";
  const trendPrefix = trend > 0 ? "+" : "";
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-50 p-3"><Icon className="h-6 w-6" /></div>
        <div className="flex-1">
          <p className="text-sm text-slate-500">{label}</p>
          <div className="mt-0.5 flex items-end gap-2">
            <p className="text-2xl font-semibold">{value}</p>
            {note && <span className="text-xs text-slate-400">{note}</span>}
          </div>
        </div>
        <div className={`text-sm font-medium ${trendColor}`}>{trendPrefix}{trend}%</div>
      </div>
    </Card>
  );
}

export function Table({ columns, data, renderCell, keyField }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full table-fixed border-collapse text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.map((row, idx) => (
            <tr key={`${row[keyField]}-${idx}`} className="hover:bg-slate-50/50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 align-top">
                  {renderCell ? renderCell(c, row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}