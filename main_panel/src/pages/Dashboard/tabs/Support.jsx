import React from "react";
import { LifeBuoy, Clock, Shield } from "lucide-react";
import { Card, KPI, Badge, Table } from "../../../components/common/UIComponents";
import { tickets } from "../../../../public/data/mockData";

export default function SupportTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KPI icon={LifeBuoy} label="Open Tickets" value={tickets.length} trend={6} />
        <KPI icon={Clock} label="Avg. First Response" value="12m" trend={-10} note="SLA" />
        <KPI icon={Shield} label="SLA Breaches (7d)" value={2} trend={1} />
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Active Tickets</h3>
          <Badge>Queue</Badge>
        </div>
        <Table
          keyField="id"
          columns={[
            { key: "id", label: "ID" },
            { key: "tenant", label: "Tenant" },
            { key: "subject", label: "Subject" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status" },
            { key: "created", label: "Created" },
            { key: "sla", label: "SLA" },
            { key: "assignee", label: "Assignee" },
          ]}
          data={tickets}
          renderCell={(c, row) => {
            if (c.key === "priority")
              return (
                <Badge variant={row.priority === "Critical" ? "danger" : row.priority === "High" ? "warn" : "default"}>
                  {row.priority}
                </Badge>
              );
            if (c.key === "status")
              return (
                <Badge variant={row.status === "Open" ? "info" : row.status === "In Progress" ? "success" : "default"}>
                  {row.status}
                </Badge>
              );
            return row[c.key];
          }}
        />
      </Card>

      <Card>
        <h3 className="mb-2 text-sm font-semibold">Knowledge Base Health</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Article Coverage</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-2 bg-emerald-500" style={{ width: "78%" }} />
            </div>
            <p className="mt-1 text-sm font-medium">78%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Self-Serve Resolution</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-2 bg-indigo-500" style={{ width: "64%" }} />
            </div>
            <p className="mt-1 text-sm font-medium">64%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">CSAT (30d)</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-2 bg-amber-500" style={{ width: "91%" }} />
            </div>
            <p className="mt-1 text-sm font-medium">4.6 / 5</p>
          </div>
        </div>
      </Card>
    </div>
  );
}