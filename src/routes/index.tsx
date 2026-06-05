import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Headphones, Tag as TagIcon, Sparkles } from "lucide-react";
import { Button } from "./../components/ui/button";
import { ProductCard } from "./../components/marketplace/ProductCard";
import { products, categories, services, formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bazaaro — India's All-in-One Marketplace" },
      { name: "description", content: "Shop products, hire services, and discover businesses on Bazaaro — the modern marketplace." },
      { property: "og:title", content: "Bazaaro Marketplace" },
      { property: "og:description", content: "Products. Services. Businesses. All in one place." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const trending = products.slice(0, 10);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_40%)] opacity-10" />
        <div className="container relative mx-auto grid gap-10 px-4 py-20 text-primary-foreground md:grid-cols-2 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3 w-3" /> Mega Festive Sale — Up to 70% Off
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
              Shop everything.<br />Discover everyone.
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              From electronics to home services to local businesses — Bazaaro brings every marketplace into one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products"><Button size="lg" className="bg-white text-primary hover:bg-white/90">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/categories"><Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">View Categories</Button></Link>
              <Link to="/services"><Button size="lg" variant="ghost" className="text-white hover:bg-white/15">Explore Services</Button></Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
              <div><div className="text-2xl font-bold">50K+</div><div className="text-white/80">Products</div></div>
              <div><div className="text-2xl font-bold">8K+</div><div className="text-white/80">Sellers</div></div>
              <div><div className="text-2xl font-bold">1M+</div><div className="text-white/80">Happy Buyers</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <motion.img key={p.id} src={p.image} alt={p.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className={`h-44 w-full rounded-2xl object-cover shadow-2xl md:h-56 ${i % 2 ? "translate-y-6" : ""}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container mx-auto grid grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
        {[
          { i: Truck, t: "Free Delivery", s: "On orders over ₹499" },
          { i: ShieldCheck, t: "Secure Payments", s: "100% protected checkout" },
          { i: Headphones, t: "24/7 Support", s: "Real humans, always" },
          { i: TagIcon, t: "Best Prices", s: "Daily deals, every day" },
        ].map((f) => (
          <div key={f.t} className="glass-card flex items-center gap-3 rounded-xl p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><f.i className="h-5 w-5" /></div>
            <div><div className="text-sm font-semibold">{f.t}</div><div className="text-xs text-muted-foreground">{f.s}</div></div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <SectionHeader title="Shop by Category" ctaTo="/categories" ctaLabel="View all" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <Link key={c.id} to="/products" search={{ category: c.id } as never} className="group glass-card rounded-xl p-3 text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-lg bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="mt-2 text-sm font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.count.toLocaleString()} items</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <SectionHeader title="Featured Deals" ctaTo="/products" ctaLabel="View all deals" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Become Seller banner */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative overflow-hidden rounded-2xl gradient-accent p-8 md:p-12">
          <div className="relative z-10 max-w-xl text-accent-foreground">
            <h3 className="text-3xl font-bold md:text-4xl">Sell on Bazaaro.</h3>
            <p className="mt-2 text-accent-foreground/80">Reach millions of buyers across India. Set up your store in minutes.</p>
            <Link to="/seller/register" className="mt-5 inline-block"><Button size="lg" variant="default" className="bg-foreground text-background hover:bg-foreground/90">Become a Seller</Button></Link>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-10">
        <SectionHeader title="Trending Now" ctaTo="/products" ctaLabel="See more" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-10">
        <SectionHeader title="Popular Services" ctaTo="/services" ctaLabel="Explore all" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {services.slice(0, 4).map((s) => (
            <Link key={s.id} to="/services" className="group glass-card overflow-hidden rounded-xl">
              <img src={s.image} alt={s.name} loading="lazy" className="h-40 w-full object-cover transition-transform group-hover:scale-110" />
              <div className="p-3">
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">by {s.provider}</div>
                <div className="mt-2 text-base font-bold text-primary">{formatINR(s.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, ctaTo, ctaLabel }: { title: string; ctaTo: string; ctaLabel: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <Link to={ctaTo} className="text-sm font-medium text-primary hover:underline">{ctaLabel} →</Link>
    </div>
  );
}
