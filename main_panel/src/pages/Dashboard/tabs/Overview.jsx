import React, { useMemo }  from "react";
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  Clock,
  TrendingUp,
  CreditCard
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
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { Card, KPI, Badge, Table } from "../../../components/common/UIComponents";
import { kpiData, revenueTrend, planMix, logs, COLORS,tenants, invoices, revenueByPlan, churnRetention } from "../../../../public/data/mockData";

export default function OverviewTab() {

 const totals = useMemo(() => {
    const mrr = tenants.reduce((a, t) => a + t.mrr, 0);
    const ar = mrr * 12;
    const overdue = invoices.filter((i) => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);
    return { mrr, ar, overdue };
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPI icon={Building2} label="Organizations" value={kpiData.orgs.toLocaleString()} trend={8} />
        <KPI icon={Users} label="Total Users" value={kpiData.users.toLocaleString()} trend={5} />
        <KPI icon={DollarSign} label="MRR (platform)" value={`$${totals.mrr.toLocaleString()}`} trend={3} />
        <KPI icon={TrendingUp} label="ARR (projected)" value={`$${totals.ar.toLocaleString()}`} trend={3} />
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