import React from "react";
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, KPI, Badge, Table } from "../../../components/common/UIComponents";
import { kpiData, revenueTrend, planMix, logs, COLORS } from "../data/mockData";

export default function OverviewTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KPI icon={Building2} label="Organizations" value={kpiData.orgs.toLocaleString()} trend={8} />
        <KPI icon={Users} label="Total Users" value={kpiData.users.toLocaleString()} trend={5} />
        <KPI icon={DollarSign} label="MRR" value={`$${kpiData.mrr.toLocaleString()}`} note="USD" trend={3} />
        <KPI icon={Activity} label="Active Sessions" value={kpiData.activeSessions.toLocaleString()} trend={12} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Revenue Trend</h3>
            <Badge variant="info">Last 11 months</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#6366F1" fill="url(#grad1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Plan Distribution</h3>
            <Badge>Tenants by plan</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={planMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {planMix.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Recent Activity</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-4 w-4" /> Updated just now
          </div>
        </div>
        <Table
          keyField="ts"
          columns={[
            { key: "ts", label: "Timestamp" },
            { key: "level", label: "Level" },
            { key: "source", label: "Source" },
            { key: "message", label: "Message" },
          ]}
          data={logs.slice(0, 6)}
          renderCell={(c, row) => {
            if (c.key === "level") {
              const v = row.level;
              return (
                <Badge variant={v === "ERROR" ? "danger" : v === "WARN" ? "warn" : "default"}>{v}</Badge>
              );
            }
            return row[c.key];
          }}
        />
      </Card>
    </div>
  );
}