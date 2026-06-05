import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Bazaaro" }] }),
  component: () => {
    const nav = useNavigate();
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden lg:block gradient-hero">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_50%)] opacity-10" />
          <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
            <Link to="/" className="flex items-center gap-2"><Store className="h-6 w-6" /><span className="text-xl font-bold">Bazaaro</span></Link>
            <div>
              <h2 className="text-4xl font-bold">Welcome back.</h2>
              <p className="mt-3 max-w-md text-white/85">Sign in to access your orders, wishlist, and personalized recommendations.</p>
            </div>
            <div className="text-sm text-white/70">© Bazaaro Marketplace</div>
          </div>
        </div>
        <div className="flex items-center justify-center p-6">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Logged in!"); nav({ to: "/" }); }} className="w-full max-w-sm space-y-4">
            <div><h1 className="text-2xl font-bold">Sign in</h1><p className="text-sm text-muted-foreground">Use your email and password.</p></div>
            <div><Label>Email</Label><Input type="email" required defaultValue="demo@bazaaro.com" /></div>
            <div><Label>Password</Label><Input type="password" required defaultValue="demo1234" /></div>
            <Button type="submit" className="w-full" size="lg">Login</Button>
            <p className="text-center text-sm text-muted-foreground">No account? <Link to="/register" className="text-primary">Register</Link></p>
          </form>
        </div>
      </div>
    );
  },
});
