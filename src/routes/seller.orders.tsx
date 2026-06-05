import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { orders, formatINR } from "./../lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/orders")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Orders ({orders.length})</h1>
      <div className="glass-card mt-4 overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Date</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono">{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell className="font-semibold">{formatINR(o.total)}</TableCell>
                <TableCell><Badge variant="outline">{o.status}</Badge></TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => toast.success("Marked as shipped")}>Ship</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
