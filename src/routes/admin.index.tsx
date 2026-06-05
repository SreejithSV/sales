import { createFileRoute } from "@tanstack/react-router";
import { Users, Store, Package, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { revenueByMonth, categories, formatINR } from "./../lib/demo-data";

const COLORS = ["oklch(0.546 0.215 262.5)", "oklch(0.553 0.234 295)", "oklch(0.78 0.165 70)", "oklch(0.696 0.155 162)", "oklch(0.637 0.227 25)", "oklch(0.65 0.2 200)", "oklch(0.7 0.18 320)", "oklch(0.6 0.2 140)"];

export const Route = createFileRoute("/admin/")({
  component: () => {
    const stats = [
      { i: DollarSign, l: "Total Revenue", v: formatINR(1058000), c: "text-success" },
      { i: Users, l: "Total Users", v: "12,480", c: "text-primary" },
      { i: Store, l: "Active Sellers", v: "847", c: "text-secondary" },
      { i: Package, l: "Total Products", v: "50,243", c: "text-accent" },
    ];
    const pieData = categories.map((c) => ({ name: c.name, value: c.count }));
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="glass-card flex items-center gap-3 rounded-xl p-4">
              <div className={`grid h-12 w-12 place-items-center rounded-lg bg-muted ${s.c}`}><s.i className="h-5 w-5" /></div>
              <div><div className="text-2xl font-bold">{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-xl p-5">
            <h3 className="mb-3 font-semibold">Revenue</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Line type="monotone" dataKey="revenue" stroke={COLORS[0]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card rounded-xl p-5">
            <h3 className="mb-3 font-semibold">Orders</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Bar dataKey="orders" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-3 font-semibold">Products by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  },
});
