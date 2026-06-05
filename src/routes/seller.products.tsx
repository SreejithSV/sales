import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit, Plus, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { products, formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/products")({
  component: () => (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        <Link to="/seller/products/add"><Button><Plus className="mr-1 h-4 w-4" />Add Product</Button></Link>
      </div>
      <div className="glass-card overflow-hidden rounded-xl">
        <Table>
          <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {products.slice(0, 15).map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={p.image} className="h-10 w-10 rounded object-cover" />
                    <span className="line-clamp-1 max-w-[260px] font-medium">{p.title}</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{p.category}</TableCell>
                <TableCell className="font-semibold">{formatINR(p.price)}</TableCell>
                <TableCell><span className={p.stock > 0 ? "text-success" : "text-destructive"}>{p.stock}</span></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Link to="/product/$id" params={{ id: p.id }}><Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button></Link>
                    <Link to="/seller/products/edit/$id" params={{ id: p.id }}><Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button></Link>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => toast.success("Deleted")}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
