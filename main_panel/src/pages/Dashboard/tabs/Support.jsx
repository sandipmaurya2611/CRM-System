import React from "react";
import { LifeBuoy, Clock, Shield } from "lucide-react";
import { Card, KPI, Badge, Table } from "../../../components/common/UIComponents";
import { tickets } from "../../../../public/data/mockData";

export default function SupportTab() {
  return (
    <div className="space-y-4">
     
     

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

    </div>
  );
}