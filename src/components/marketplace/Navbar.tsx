import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, Bell, User, Menu, Moon, Sun, Store, LogIn, Package, Tag, Briefcase, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore, cartCount } from "../../lib/store";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: Tag },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/sellers", label: "Sellers", icon: Store },
  { to: "/businesses", label: "Businesses", icon: Briefcase },
];

export function Navbar() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { cart, wishlist, theme, toggleTheme, notifications, markAllRead } = useStore();
  const [q, setQ] = useState("");
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q } as never });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mt-8 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              ))}
              <Link to="/seller/register" className="mt-2 flex items-center gap-3 rounded-md gradient-hero px-3 py-2 text-primary-foreground">
                <Store className="h-4 w-4" /> Become a Seller
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-hero shadow-glow">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight sm:block">Bazaaro</span>
        </Link>

        <form onSubmit={onSearch} className="relative ml-2 hidden flex-1 max-w-xl md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, services..." className="pl-10 h-10" />
        </form>

        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = path.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link to="/seller/register" className="hidden lg:block">
            <Button variant="outline" size="sm" className="gap-1.5"><Store className="h-4 w-4" />Become Seller</Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setTimeout(markAllRead, 800)}>
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">{unread}</motion.span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="border-b px-4 py-3 font-semibold">Notifications</div>
              <ul className="max-h-80 overflow-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="border-b px-4 py-3 text-sm last:border-0 hover:bg-muted">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-muted-foreground">{n.body}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{n.time}</div>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <Link to="/messages"><Button variant="ghost" size="icon"><MessageSquare className="h-5 w-5" /></Button></Link>

          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
            {wishlist.length > 0 && <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-[10px]">{wishlist.length}</Badge>}
          </Link>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /></Button>
            {cartCount(cart) > 0 && <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-accent px-1 text-[10px] text-accent-foreground">{cartCount(cart)}</Badge>}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/orders">Orders</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/wishlist">Wishlist</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/seller">Seller Panel</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/admin">Admin Panel</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/login"><LogIn className="mr-2 h-4 w-4" />Login / Register</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
