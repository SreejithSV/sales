import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { users } from "./../lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Users ({users.length})</h1>
      <div className="glass-card mt-4 overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Orders</TableHead><TableHead>Joined</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {users.slice(0, 25).map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.orders}</TableCell>
                <TableCell>{u.joined}</TableCell>
                <TableCell><Badge variant={u.status === "Active" ? "outline" : "destructive"}>{u.status}</Badge></TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => toast(u.status === "Active" ? "Suspended" : "Activated")}>{u.status === "Active" ? "Suspend" : "Activate"}</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
