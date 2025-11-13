import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, CreditCard, BookOpen } from "lucide-react";
import { Card, KPI, Badge, Table } from "../../../components/common/UIComponents";
import { tenants, invoices, revenueByPlan, churnRetention } from "../data/mockData";

export default function BillingTab() {
  const totals = useMemo(() => {
    const mrr = tenants.reduce((a, t) => a + t.mrr, 0);
    const ar = mrr * 12;
    const overdue = invoices.filter((i) => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);
    return { mrr, ar, overdue };
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KPI icon={DollarSign} label="MRR (platform)" value={`$${totals.mrr.toLocaleString()}`} trend={3} />
        <KPI icon={TrendingUp} label="ARR (projected)" value={`$${totals.ar.toLocaleString()}`} trend={3} />
        <KPI icon={CreditCard} label="Overdue" value={`$${totals.overdue.toLocaleString()}`} trend={-2} />
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent Invoices</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="h-4 w-4" /> Last 30 days
          </div>
        </div>
        <Table
          keyField="id"
          columns={[
            { key: "id", label: "Invoice" },
            { key: "tenant", label: "Tenant" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "method", label: "Method" },
            { key: "issued", label: "Issued" },
            { key: "due", label: "Due" },
          ]}
          data={invoices}
          renderCell={(c, row) => {
            if (c.key === "amount") return `$${row.amount.toLocaleString()}`;
            if (c.key === "status")
              return (
                <Badge variant={row.status === "Paid" ? "success" : row.status === "Overdue" ? "danger" : "warn"}>
                  {row.status}
                </Badge>
              );
            return row[c.key];
          }}
        />
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-sm font-semibold">Revenue by Plan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByPlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rev" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="mb-2 text-sm font-semibold">Churn & Retention</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnRetention}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="ret" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}