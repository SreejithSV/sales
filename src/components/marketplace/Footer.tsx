import { Link } from "@tanstack/react-router";
import { Store, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/30">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-hero"><Store className="h-5 w-5 text-primary-foreground" /></div>
            <span className="text-lg font-bold">Bazaaro</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            India's all-in-one marketplace for products, services, and businesses.
          </p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <Facebook className="h-4 w-4" /><Twitter className="h-4 w-4" /><Instagram className="h-4 w-4" /><Youtube className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-foreground">Categories</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/businesses" className="hover:text-foreground">Businesses</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/profile" className="hover:text-foreground">My Profile</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-foreground">Wishlist</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Business</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/seller/register" className="hover:text-foreground">Become a Seller</Link></li>
            <li><Link to="/seller" className="hover:text-foreground">Seller Panel</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Admin Panel</Link></li>
            <li><Link to="/messages" className="hover:text-foreground">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bazaaro. Built as a complete marketplace demo.
      </div>
    </footer>
  );
}
