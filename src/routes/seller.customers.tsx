import { createFileRoute } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { users } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/customers")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="glass-card mt-4 overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Orders</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
          <TableBody>
            {users.slice(0, 20).map((u) => (
              <TableRow key={u.id}><TableCell className="font-medium">{u.name}</TableCell><TableCell>{u.email}</TableCell><TableCell>{u.orders}</TableCell><TableCell>{u.joined}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
