import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "./../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { orders, formatINR } from "./../lib/demo-data";

const statusColors: Record<string, string> = {
  Pending: "bg-warning/15 text-warning",
  Shipped: "bg-primary/15 text-primary",
  Delivered: "bg-success/15 text-success",
  Cancelled: "bg-destructive/15 text-destructive",
};

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — Bazaaro" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Order History</h1>
      <p className="text-muted-foreground">{orders.length} orders</p>
      <div className="glass-card mt-6 overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Date</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {orders.slice(0, 12).map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-sm">{o.id}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell>{o.items}</TableCell>
                <TableCell className="font-semibold">{formatINR(o.total)}</TableCell>
                <TableCell><span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>{o.status}</span></TableCell>
                <TableCell><Link to="/messages"><Button size="sm" variant="outline">Track</Button></Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
