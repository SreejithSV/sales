import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { useStore, cartTotal } from "./../lib/store";
import { formatINR } from "./../lib/demo-data";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Bazaaro" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateQty } = useStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const subtotal = cartTotal(cart);
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  if (!cart.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some products to get started.</p>
        <Link to="/products"><Button size="lg" className="mt-6">Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Shopping Cart ({cart.length})</h1>
        {cart.map(({ product, qty }) => (
          <div key={product.id} className="glass-card flex gap-4 rounded-xl p-3">
            <img src={product.image} alt={product.title} className="h-24 w-24 rounded-lg object-cover" />
            <div className="flex-1">
              <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-1 font-semibold hover:text-primary">{product.title}</Link>
              <div className="text-xs text-muted-foreground">by {product.sellerName}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-bold">{formatINR(product.price)}</span>
                <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-md border">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateQty(product.id, qty - 1)}><Minus className="h-3 w-3" /></Button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateQty(product.id, qty + 1)}><Plus className="h-3 w-3" /></Button>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { removeFromCart(product.id); toast("Removed from cart"); }}><Trash2 className="mr-1 h-3.5 w-3.5" />Remove</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="glass-card h-fit space-y-4 rounded-xl p-5">
        <h2 className="font-semibold">Order Summary</h2>
        <div className="flex gap-2">
          <Input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <Button variant="outline" onClick={() => toast.success("Coupon applied!")}><Tag className="mr-1 h-3.5 w-3.5" />Apply</Button>
        </div>
        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatINR(subtotal)} />
          <Row label="Delivery" value={delivery === 0 ? "FREE" : formatINR(delivery)} />
          <div className="border-t pt-2"><Row label="Total" value={formatINR(total)} bold /></div>
        </div>
        <Button className="w-full gradient-accent text-accent-foreground" size="lg" onClick={() => navigate({ to: "/checkout" })}>Proceed to Checkout</Button>
      </aside>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className={`flex justify-between ${bold ? "text-lg font-bold" : "text-muted-foreground"}`}><span>{label}</span><span className={bold ? "text-foreground" : "font-medium text-foreground"}>{value}</span></div>;
}
