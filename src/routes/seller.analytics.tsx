import { createFileRoute } from "@tanstack/react-router";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { revenueByMonth } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/analytics")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="glass-card mt-4 rounded-xl p-5">
        <h3 className="mb-3 font-semibold">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueByMonth}>
            <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.546 0.215 262.5)" stopOpacity={0.4} /><stop offset="100%" stopColor="oklch(0.546 0.215 262.5)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="oklch(0.546 0.215 262.5)" fill="url(#g)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  ),
});
