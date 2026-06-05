import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldCheck, Star } from "lucide-react";
import { getSeller, products } from "./../lib/demo-data";
import { ProductCard } from "./../components/marketplace/ProductCard";

export const Route = createFileRoute("/seller/$id")({
  loader: ({ params }) => {
    const s = getSeller(params.id);
    if (!s) throw notFound();
    return { seller: s };
  },
  notFoundComponent: () => <div className="container mx-auto p-12 text-center">Seller not found.</div>,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.seller.name} — Seller on Bazaaro` }] }),
  component: () => {
    const { seller } = Route.useLoaderData();
    const sellerProducts = products.filter((p) => p.sellerId === seller.id);
    return (
      <div>
        <div className="gradient-hero text-primary-foreground">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-12 md:flex-row md:items-center">
            <img src={seller.image} alt={seller.name} className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/30" />
            <div className="flex-1">
              <h1 className="flex items-center gap-2 text-3xl font-bold">{seller.name}{seller.verified && <ShieldCheck className="h-6 w-6" />}</h1>
              <p className="text-white/80">{seller.city} · since {seller.since}</p>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" />{seller.rating.toFixed(1)}</span>
                <span>{seller.products} products</span>
                <span>12.4K followers</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h2 className="mb-4 text-2xl font-bold">Products from this seller</h2>
          {sellerProducts.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {sellerProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-12 text-center text-muted-foreground">
              No products yet. <Link to="/products" className="text-primary">Browse all</Link>
            </div>
          )}
        </div>
      </div>
    );
  },
});
