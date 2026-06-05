import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Textarea } from "./../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./../components/ui/select";
import { Upload } from "lucide-react";
import { categories } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/products/add")({
  component: AddProduct,
});

function AddProduct() {
  const nav = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Product saved"); nav({ to: "/seller/products" }); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label>Product Name</Label><Input required placeholder="e.g. Premium Wireless Headphones" /></div>
        <div>
          <Label>Category</Label>
          <Select><SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
            <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Brand</Label><Input /></div>
        <div><Label>Price (₹)</Label><Input type="number" required /></div>
        <div><Label>MRP (₹)</Label><Input type="number" /></div>
        <div><Label>Stock</Label><Input type="number" required /></div>
        <div><Label>SKU</Label><Input /></div>
        <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={4} /></div>
        <div className="sm:col-span-2"><Label>Specifications</Label><Textarea rows={3} placeholder="Color: Black&#10;Warranty: 1 year" /></div>
        <div className="sm:col-span-2">
          <Label>Product Images</Label>
          <div className="mt-1 grid h-40 place-items-center rounded-lg border-2 border-dashed text-muted-foreground">
            <div className="text-center"><Upload className="mx-auto mb-2 h-8 w-8" /><div className="text-sm">Drop images here or click to upload</div></div>
          </div>
        </div>
        <div className="sm:col-span-2 flex gap-2"><Button type="submit" size="lg">Save Product</Button><Button type="button" variant="outline" onClick={() => nav({ to: "/seller/products" })}>Cancel</Button></div>
      </form>
    </div>
  );
}
