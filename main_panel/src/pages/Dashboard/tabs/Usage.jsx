import React from "react";
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
  AreaChart,
  Area,
} from "recharts";
import { Card, Badge } from "../../../components/common/UIComponents";
import { usageTrend, regionalUsage } from "../data/mockData";

export default function UsageTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">API Requests (daily)</h3>
            <Badge variant="info">Real-time</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="api" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Background Jobs</h3>
            <Badge>Past week</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">User Logins</h3>
            <Badge>Past week</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="logins" stroke="#10B981" fill="#10B98133" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Regional Usage Split</h3>
          <Badge>Sample</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {regionalUsage.map((r) => (
              <div key={r.region} className="flex items-center gap-3">
                <div className="h-2 w-40 overflow-hidden rounded bg-slate-100">
                  <div className="h-2 bg-indigo-500" style={{ width: `${r.value}%` }} />
                </div>
                <div className="text-sm text-slate-600">{r.region}</div>
                <div className="ml-auto text-sm font-medium">{r.value}%</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-500">
            <p>
              Monitor API throughput, worker success rate, and login spikes to anticipate capacity needs and mitigate
              incidents early.
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Alert at &gt; 200k req/min or 5% error rate</li>
              <li>Queue depth threshold: 10k jobs</li>
              <li>Auth anomalies: geo-mismatch or 5 failed logins</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}