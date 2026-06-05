import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, Star, MessageSquare, BarChart3, Settings } from "lucide-react";
import { PanelLayout } from "./../components/marketplace/PanelLayout";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller Panel — Bazaaro" }] }),
  component: () => (
    <PanelLayout
      title="Seller Panel"
      basePath="/seller"
      items={[
        { to: "/seller", label: "Dashboard", icon: LayoutDashboard },
        { to: "/seller/products", label: "Products", icon: Package },
        { to: "/seller/orders", label: "Orders", icon: ShoppingBag },
        { to: "/seller/customers", label: "Customers", icon: Users },
        { to: "/seller/reviews", label: "Reviews", icon: Star },
        { to: "/seller/messages", label: "Messages", icon: MessageSquare },
        { to: "/seller/analytics", label: "Analytics", icon: BarChart3 },
        { to: "/seller/settings", label: "Settings", icon: Settings },
      ]}
    />
  ),
});
