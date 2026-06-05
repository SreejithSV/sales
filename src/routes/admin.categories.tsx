import { createFileRoute } from "@tanstack/react-router";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "./../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { categories } from "./../lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories")({
  component: () => (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => toast.success("Category added")}><Plus className="mr-1 h-4 w-4" />Add Category</Button>
      </div>
      <div className="glass-card overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Subcategories</TableHead><TableHead>Products</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{c.subcategories.join(", ")}</TableCell>
                <TableCell>{c.count.toLocaleString()}</TableCell>
                <TableCell><Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
