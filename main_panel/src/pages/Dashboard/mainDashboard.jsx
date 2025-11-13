import React, { useState } from "react";
import {
  Activity,
  Building2,
  Server,
  DollarSign,
  LifeBuoy,
  BookOpen,
} from "lucide-react";
import OverviewTab from "./tabs/Overview";
import TenantsTab from "./tabs/Tenants";
import UsageTab from "./tabs/Usage";
import BillingTab from "./tabs/Billing";
import SupportTab from "./tabs/Support";
// import LogsTab from "./tabs/Logs";

const tabs = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "tenants", label: "Tenants", icon: Building2 },
  { id: "usage", label: "Usage", icon: Server },
  { id: "billing", label: "Billing", icon: DollarSign },
  { id: "support", label: "Support", icon: LifeBuoy },
  // { id: "logs", label: "Logs", icon: BookOpen },
];

export default function SuperAdminDashboard() {
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm shadow-sm transition ${
                active === t.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Pages */}
        {active === "overview" && <OverviewTab />}
        {active === "tenants" && <TenantsTab />}
        {active === "usage" && <UsageTab />}
        {active === "billing" && <BillingTab />}
        {active === "support" && <SupportTab />}
        {/* {active === "logs" && <LogsTab />} */}
      </main>
    </div>
  );
}