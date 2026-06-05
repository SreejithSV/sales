import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { revenueByMonth, categories, sellers, formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/admin/products")({
  component: () => {
    const sellerPerf = sellers.slice(0, 10).map((s) => ({ name: s.name.split(" ")[0], rating: +s.rating.toFixed(1), products: s.products }));
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Revenue Trend">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={11} /><YAxis fontSize={11} /><Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.546 0.215 262.5)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Orders by Month">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={11} /><YAxis fontSize={11} /><Tooltip />
                <Bar dataKey="orders" fill="oklch(0.553 0.234 295)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Products by Category">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categories.map((c) => ({ name: c.name, count: c.count }))}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" fontSize={10} /><YAxis fontSize={11} /><Tooltip />
                <Bar dataKey="count" fill="oklch(0.78 0.165 70)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Seller Performance (rating)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={sellerPerf}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" fontSize={10} /><YAxis fontSize={11} domain={[0, 5]} /><Tooltip />
                <Bar dataKey="rating" fill="oklch(0.696 0.155 162)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="glass-card rounded-xl p-5 text-sm text-muted-foreground">
          <strong className="text-foreground">Summary:</strong> Platform generated {formatINR(1058000)} this year with strong growth in Q4.
        </div>
      </div>
    );
  },
});

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="glass-card rounded-xl p-5"><h3 className="mb-3 font-semibold">{title}</h3>{children}</div>;
}
