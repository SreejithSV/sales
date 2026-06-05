import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Textarea } from "./../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./../components/ui/select";
import { Upload } from "lucide-react";
import { categories } from "./../lib/demo-data";

export const Route = createFileRoute("/admin/products/add")({
  component: () => {
    const nav = useNavigate();
    return (
      <div>
        <h1 className="text-2xl font-bold">Add Product (Admin)</h1>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Product added"); nav({ to: "/admin/products" }); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>Name</Label><Input required /></div>
          <div><Label>Category</Label>
            <Select><SelectTrigger><SelectValue placeholder="Pick category" /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Assigned Seller</Label><Input placeholder="Seller name" /></div>
          <div><Label>Price</Label><Input type="number" required /></div>
          <div><Label>Stock</Label><Input type="number" required /></div>
          <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={4} /></div>
          <div className="sm:col-span-2">
            <Label>Images</Label>
            <div className="mt-1 grid h-32 place-items-center rounded-lg border-2 border-dashed text-muted-foreground">
              <div className="text-center"><Upload className="mx-auto mb-2 h-7 w-7" />Upload images</div>
            </div>
          </div>
          <div className="sm:col-span-2"><Button type="submit">Save Product</Button></div>
        </form>
      </div>
    );
  },
});
