import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Textarea } from "./../components/ui/textarea";
import { getProduct } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/products/edit/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  notFoundComponent: () => <div className="p-8">Product not found.</div>,
  component: () => {
    const { product } = Route.useLoaderData();
    const nav = useNavigate();
    return (
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Saved changes"); nav({ to: "/seller/products" }); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>Product Name</Label><Input defaultValue={product.title} /></div>
          <div><Label>Price</Label><Input type="number" defaultValue={product.price} /></div>
          <div><Label>MRP</Label><Input type="number" defaultValue={product.mrp} /></div>
          <div><Label>Stock</Label><Input type="number" defaultValue={product.stock} /></div>
          <div><Label>Category</Label><Input defaultValue={product.category} /></div>
          <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={4} defaultValue={product.description} /></div>
          <div className="sm:col-span-2 flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => nav({ to: "/seller/products" })}>Cancel</Button></div>
        </form>
      </div>
    );
  },
});
