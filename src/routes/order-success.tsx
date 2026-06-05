import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/button";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Confirmed — Bazaaro" }] }),
  component: () => {
    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 89999);
    const tracking = "TRK" + Math.floor(100000000 + Math.random() * 899999999);
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <CheckCircle2 className="h-24 w-24 text-success" />
        </motion.div>
        <h1 className="mt-6 text-4xl font-bold">Order Placed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for shopping with Bazaaro.</p>
        <div className="glass-card mt-8 grid gap-3 rounded-xl p-6 text-left">
          <div className="text-sm"><span className="text-muted-foreground">Order ID: </span><span className="font-bold">{orderId}</span></div>
          <div className="text-sm"><span className="text-muted-foreground">Tracking #: </span><span className="font-mono">{tracking}</span></div>
          <div className="text-sm"><span className="text-muted-foreground">ETA: </span><span className="font-medium">3–5 business days</span></div>
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/products"><Button variant="outline" size="lg">Continue Shopping</Button></Link>
          <Link to="/orders"><Button size="lg">Track Order</Button></Link>
        </div>
      </div>
    );
  },
});
