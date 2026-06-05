import { createFileRoute } from "@tanstack/react-router";
import { User, Package, Heart, MessageSquare, Wallet, Bell, Settings, LayoutDashboard } from "lucide-react";
import { PanelLayout } from "./../components/marketplace/PanelLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Bazaaro" }] }),
  component: () => (
    <PanelLayout
      title="My Account"
      basePath="/dashboard"
      items={[
        { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { to: "/dashboard/profile", label: "Profile", icon: User },
        { to: "/dashboard/orders", label: "Orders", icon: Package },
        { to: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
        { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
        { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
        { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
        { to: "/dashboard/settings", label: "Settings", icon: Settings },
      ]}
    />
  ),
});
