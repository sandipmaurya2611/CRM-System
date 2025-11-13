import React, { useMemo, useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Badge, Table } from "../../../components/common/UIComponents";
import { tenants } from "../../../../public/data/mockData";

export default function TenantsTab() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tenants.filter(
      (t) => t.name.toLowerCase().includes(q) || t.admin.toLowerCase().includes(q) || t.plan.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Tenant Directory</h3>
          <Badge variant="info">{tenants.length} total</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tenant, admin, plan..."
              className="w-72 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-indigo-100 focus:ring-4"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>
      <Table
        keyField="id"
        maxHeight="420px" // <--- fixed size of the scroll area; only rows will scroll
        columns={[
          { key: "name", label: "Company", width: "22%" },
          { key: "admin", label: "Admin", width: "18%" },
          { key: "plan", label: "Plan", width: "10%" },
          { key: "status", label: "Status", width: "10%" },
          { key: "users", label: "Users", width: "8%" },
          { key: "dbSizeGb", label: "DB Size", width: "10%" },
          { key: "mrr", label: "MRR", width: "12%" },
          { key: "createdOn", label: "Created", width: "10%" },
        ]}
        data={filtered}
        renderCell={(c, row) => {
          switch (c.key) {
            case "plan":
              return <Badge variant={row.plan === "Pro" ? "success" : "default"}>{row.plan}</Badge>;
            case "status":
              return (
                <Badge variant={row.status === "Active" ? "success" : row.status === "Suspended" ? "danger" : "warn"}>
                  {row.status}
                </Badge>
              );
            case "dbSizeGb":
              return `${row.dbSizeGb} GB`;
            case "mrr":
              return `$${row.mrr.toLocaleString()}`;
            default:
              return row[c.key];
          }
        }}
      />

    </div>
  );
}