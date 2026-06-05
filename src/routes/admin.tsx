import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Package, FolderTree, Users, Store, ShoppingBag, Briefcase, Megaphone, FileBarChart, LifeBuoy, Settings } from "lucide-react";
import { PanelLayout } from "./../components/marketplace/PanelLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Bazaaro" }] }),
  component: () => (
    <PanelLayout
      title="Admin Panel"
      basePath="/admin"
      items={[
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/products", label: "Products", icon: Package },
        { to: "/admin/categories", label: "Categories", icon: FolderTree },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/sellers", label: "Sellers", icon: Store },
        { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
        { to: "/admin/services", label: "Services", icon: Briefcase },
        { to: "/admin/advertisements", label: "Advertisements", icon: Megaphone },
        { to: "/admin/reports", label: "Reports", icon: FileBarChart },
        { to: "/admin/support", label: "Support", icon: LifeBuoy },
        { to: "/admin/settings", label: "Settings", icon: Settings },
      ]}
    />
  ),
});
