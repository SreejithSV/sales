import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { revenueByMonth, formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/")({
  component: () => {
    const stats = [
      { i: DollarSign, l: "Revenue (30d)", v: formatINR(284500), c: "text-success" },
      { i: ShoppingBag, l: "Orders", v: "247", c: "text-primary" },
      { i: Package, l: "Products", v: "84", c: "text-accent" },
      { i: TrendingUp, l: "Growth", v: "+24%", c: "text-success" },
    ];
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
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
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.546 0.215 262.5)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card rounded-xl p-5">
            <h3 className="mb-3 font-semibold">Orders</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Bar dataKey="orders" fill="oklch(0.78 0.165 70)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  },
});
