import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Textarea } from "./../components/ui/textarea";
import { Upload, ShieldCheck, Store, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/seller/register")({
  head: () => ({ meta: [{ title: "Become a Seller — Bazaaro" }] }),
  component: () => {
    const nav = useNavigate();
    return (
      <div>
        <section className="gradient-hero py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">Start Selling on Bazaaro</h1>
            <p className="mt-3 text-white/85">Reach millions of buyers. Set up your store in minutes.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[{ i: Store, t: "Easy Setup" }, { i: TrendingUp, t: "Grow 3x Faster" }, { i: ShieldCheck, t: "Secure Payouts" }].map((f) => (
                <div key={f.t} className="rounded-xl bg-white/10 p-5 backdrop-blur"><f.i className="mx-auto h-8 w-8" /><div className="mt-2 font-semibold">{f.t}</div></div>
              ))}
            </div>
          </div>
        </section>
        <div className="container mx-auto max-w-2xl px-4 py-12">
          <h2 className="text-2xl font-bold">Seller Registration</h2>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Registration submitted! We'll verify and approve within 24 hours."); nav({ to: "/seller" }); }} className="glass-card mt-4 grid gap-4 rounded-xl p-6 sm:grid-cols-2">
            <div className="sm:col-span-2"><h3 className="font-semibold">Business Information</h3></div>
            <div><Label>Business Name</Label><Input required /></div>
            <div><Label>Business Type</Label><Input placeholder="Proprietor / LLP / Pvt Ltd" required /></div>
            <div><Label>GSTIN</Label><Input required /></div>
            <div><Label>PAN</Label><Input required /></div>
            <div className="sm:col-span-2"><Label>Business Address</Label><Textarea rows={2} required /></div>
            <div><Label>Contact Email</Label><Input type="email" required /></div>
            <div><Label>Phone</Label><Input required /></div>
            <div className="sm:col-span-2">
              <Label>Documents (GST cert., PAN, Bank cancelled cheque)</Label>
              <div className="mt-1 grid h-32 place-items-center rounded-lg border-2 border-dashed text-muted-foreground">
                <div className="text-center"><Upload className="mx-auto mb-2 h-7 w-7" /><div className="text-sm">Click to upload PDF/JPG</div></div>
              </div>
            </div>
            <div className="sm:col-span-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              <strong>Verification Process:</strong> Documents are reviewed within 24 hours. Once approved, you can start listing products immediately.
            </div>
            <div className="sm:col-span-2"><Button type="submit" size="lg" className="w-full">Submit Registration</Button></div>
          </form>
        </div>
      </div>
    );
  },
});
