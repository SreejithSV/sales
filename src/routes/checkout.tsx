import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { RadioGroup, RadioGroupItem } from "./../components/ui/radio-group";
import { useStore, cartTotal } from "./../lib/store";
import { formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Bazaaro" }] }),
  component: Checkout,
});

function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const subtotal = cartTotal(cart);
  const delivery = subtotal > 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <section className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" />Shipping Address</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Full Name</Label><Input defaultValue="Aarav Sharma" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
            <div className="sm:col-span-2"><Label>Street Address</Label><Input defaultValue="42, Park Avenue" /></div>
            <div><Label>City</Label><Input defaultValue="Mumbai" /></div>
            <div><Label>PIN Code</Label><Input defaultValue="400001" /></div>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><Truck className="h-4 w-4 text-primary" />Delivery Options</h2>
          <RadioGroup defaultValue="std" className="space-y-2">
            {[
              { v: "std", t: "Standard (3-5 days)", p: "FREE" },
              { v: "fast", t: "Express (1-2 days)", p: "₹99" },
              { v: "same", t: "Same Day (select cities)", p: "₹199" },
            ].map((d) => (
              <Label key={d.v} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted">
                <RadioGroupItem value={d.v} />
                <div className="flex-1">{d.t}</div>
                <div className="font-semibold">{d.p}</div>
              </Label>
            ))}
          </RadioGroup>
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><CreditCard className="h-4 w-4 text-primary" />Payment Method</h2>
          <RadioGroup defaultValue="card" className="space-y-2">
            {["UPI", "Credit / Debit Card", "Net Banking", "Cash on Delivery", "Wallet"].map((p) => (
              <Label key={p} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted">
                <RadioGroupItem value={p} />
                <div className="flex-1">{p}</div>
              </Label>
            ))}
          </RadioGroup>
        </section>
      </div>

      <aside className="glass-card h-fit space-y-3 rounded-xl p-5">
        <h2 className="font-semibold">Order Summary</h2>
        <div className="max-h-48 space-y-2 overflow-auto">
          {cart.map((c) => (
            <div key={c.product.id} className="flex gap-2 text-sm">
              <img src={c.product.image} className="h-10 w-10 rounded" />
              <div className="flex-1 truncate">{c.product.title} × {c.qty}</div>
              <div className="font-medium">{formatINR(c.product.price * c.qty)}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5 border-t pt-3 text-sm">
          <Row label="Subtotal" value={formatINR(subtotal)} />
          <Row label="Tax (5%)" value={formatINR(tax)} />
          <Row label="Delivery" value={delivery === 0 ? "FREE" : formatINR(delivery)} />
          <div className="flex justify-between border-t pt-2 text-lg font-bold"><span>Total</span><span>{formatINR(total)}</span></div>
        </div>
        <Button size="lg" className="w-full gradient-accent text-accent-foreground" onClick={() => { clearCart(); navigate({ to: "/order-success" }); }}>Place Order</Button>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-muted-foreground"><span>{label}</span><span className="font-medium text-foreground">{value}</span></div>;
}
