// Realistic demo data for the marketplace.

export type Product = {
  id: string;
  title: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  featured: boolean;
  description: string;
  specs: Record<string, string>;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
  subcategories: string[];
};

export type Seller = {
  id: string;
  name: string;
  rating: number;
  products: number;
  city: string;
  verified: boolean;
  image: string;
  since: string;
};

export type Service = {
  id: string;
  name: string;
  provider: string;
  price: number;
  rating: number;
  image: string;
  category: string;
};

export type Business = {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  image: string;
  phone: string;
};

export type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  customer: string;
  tracking: string;
};

export type Message = {
  id: string;
  from: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
};

const PIC = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "Laptop", count: 1240, image: PIC("electronics"), subcategories: ["Mobiles", "Laptops", "Audio", "Cameras", "TVs"] },
  { id: "fashion", name: "Fashion", icon: "Shirt", count: 3870, image: PIC("fashion"), subcategories: ["Men", "Women", "Kids", "Footwear", "Watches"] },
  { id: "home", name: "Home & Kitchen", icon: "Sofa", count: 2210, image: PIC("home"), subcategories: ["Furniture", "Decor", "Appliances", "Cookware"] },
  { id: "beauty", name: "Beauty", icon: "Sparkles", count: 980, image: PIC("beauty"), subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance"] },
  { id: "sports", name: "Sports & Fitness", icon: "Dumbbell", count: 540, image: PIC("sports"), subcategories: ["Gym", "Outdoor", "Cycling", "Yoga"] },
  { id: "grocery", name: "Grocery", icon: "ShoppingBasket", count: 1820, image: PIC("grocery"), subcategories: ["Staples", "Snacks", "Beverages", "Dairy"] },
  { id: "books", name: "Books", icon: "BookOpen", count: 760, image: PIC("books"), subcategories: ["Fiction", "Academic", "Comics", "Self-help"] },
  { id: "toys", name: "Toys & Baby", icon: "Baby", count: 430, image: PIC("toys"), subcategories: ["Toys", "Diapers", "Feeding", "Clothing"] },
];

const productTitles: Record<string, string[]> = {
  electronics: ["Wireless Noise-Cancel Headphones", "4K Ultra HD Smart TV 55\"", "Pro Gaming Laptop 16GB", "Smartphone 256GB 5G", "Mirrorless Camera 24MP", "Bluetooth Soundbar 200W", "Smart Watch Series X"],
  fashion: ["Slim Fit Denim Jacket", "Running Shoes Air-Mesh", "Cotton Linen Shirt", "Leather Crossbody Bag", "Aviator Sunglasses", "Casual Chino Pants", "Hooded Sweatshirt"],
  home: ["3-Seater Fabric Sofa", "Air Fryer 5L Digital", "King Size Bedsheet Set", "Ceramic Cookware 5 pcs", "LED Floor Lamp", "Robot Vacuum Cleaner"],
  beauty: ["Vitamin C Face Serum", "Matte Liquid Lipstick", "Argan Oil Shampoo", "Eau de Parfum 100ml"],
  sports: ["Adjustable Dumbbell 24kg", "Yoga Mat Pro 6mm", "Mountain Bike 21-Speed", "Resistance Bands Set"],
  grocery: ["Organic Basmati Rice 5kg", "Cold Pressed Olive Oil 1L", "Almonds Premium 500g", "Green Tea Bags 100ct"],
  books: ["Atomic Habits — Hardcover", "The Midnight Library", "Deep Work — Cal Newport", "Sapiens: A Brief History"],
  toys: ["Building Blocks 500pcs", "Plush Teddy Bear XL", "Remote Control Car", "Baby Stroller Lightweight"],
};

const sellerNames = ["TechHub India", "FashionWorld", "HomeEssentials Co.", "BeautyBox", "FitGear Pro", "DailyMart", "BookNook", "KidsPlanet", "MetroMart", "PrimeBazaar", "OmegaTraders", "UrbanCart", "NoviStore", "ElevateRetail", "ZenithMall", "AcmeGoods", "PixelKart", "VeloShop", "QuantumStore", "NebulaTrade"];

export const sellers: Seller[] = sellerNames.map((name, i) => ({
  id: `s${i + 1}`,
  name,
  rating: 3.8 + Math.random() * 1.2,
  products: 20 + Math.floor(Math.random() * 200),
  city: ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"][i % 8],
  verified: i % 3 !== 0,
  image: PIC(`seller-${name}`, 200, 200),
  since: `${2015 + (i % 9)}`,
}));

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;
  for (const cat of categories) {
    const titles = productTitles[cat.id] || ["Premium Product"];
    const perCat = Math.ceil(50 / categories.length) + 1;
    for (let i = 0; i < perCat; i++) {
      const title = titles[i % titles.length];
      const mrp = 499 + Math.floor(Math.random() * 80000);
      const disc = 0.1 + Math.random() * 0.45;
      const price = Math.floor(mrp * (1 - disc));
      const seller = sellers[id % sellers.length];
      products.push({
        id: `p${id}`,
        title: `${title}${i > 0 ? ` v${i + 1}` : ""}`,
        price,
        mrp,
        rating: 3.5 + Math.random() * 1.5,
        reviews: 20 + Math.floor(Math.random() * 4000),
        image: PIC(`prod-${cat.id}-${id}`, 600, 600),
        category: cat.id,
        sellerId: seller.id,
        sellerName: seller.name,
        stock: Math.floor(Math.random() * 200),
        featured: id % 5 === 0,
        description: `Experience the all-new ${title}. Crafted with premium materials and engineered for everyday excellence. Backed by a 1-year manufacturer warranty and easy 7-day returns.`,
        specs: {
          Brand: seller.name,
          Warranty: "1 Year",
          Color: ["Black", "White", "Blue", "Silver"][id % 4],
          "In Box": "Main Unit, User Manual, Warranty Card",
        },
      });
      id++;
      if (products.length >= 50) return products;
    }
  }
  return products;
}

export const products: Product[] = generateProducts();

export const services: Service[] = [
  { id: "sv1", name: "Home Deep Cleaning", provider: "CleanPro", price: 1499, rating: 4.7, image: PIC("svc-clean"), category: "Home" },
  { id: "sv2", name: "AC Repair & Service", provider: "CoolFix", price: 599, rating: 4.5, image: PIC("svc-ac"), category: "Appliance" },
  { id: "sv3", name: "Salon at Home", provider: "GlowUp", price: 899, rating: 4.8, image: PIC("svc-salon"), category: "Beauty" },
  { id: "sv4", name: "Plumbing Services", provider: "FixIt", price: 399, rating: 4.4, image: PIC("svc-plumb"), category: "Repair" },
  { id: "sv5", name: "Personal Trainer", provider: "FitLife", price: 1999, rating: 4.9, image: PIC("svc-fit"), category: "Fitness" },
  { id: "sv6", name: "Tutor — Mathematics", provider: "EduStar", price: 799, rating: 4.6, image: PIC("svc-edu"), category: "Education" },
  { id: "sv7", name: "Pest Control", provider: "BugOff", price: 1299, rating: 4.3, image: PIC("svc-pest"), category: "Home" },
  { id: "sv8", name: "Wedding Photography", provider: "Lensify", price: 24999, rating: 4.9, image: PIC("svc-photo"), category: "Events" },
];

export const businesses: Business[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `b${i + 1}`,
  name: ["Sunrise Furniture", "Royal Caterers", "Apex Electricals", "Zen Interiors", "Galaxy Printers", "Metro Hardware", "Bloom Florists", "Atlas Logistics", "Nova Tailors", "Prime Marble", "Bharat Stationery", "Coastal Seafoods"][i],
  category: ["Furniture", "Catering", "Electrical", "Interiors", "Printing", "Hardware", "Florist", "Logistics", "Tailoring", "Marble", "Stationery", "Seafood"][i],
  city: ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai"][i % 6],
  rating: 3.8 + Math.random() * 1.2,
  image: PIC(`biz-${i}`, 400, 300),
  phone: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
}));

export const orders: Order[] = Array.from({ length: 30 }).map((_, i) => {
  const item = products[i % products.length];
  const itemsCount = 1 + (i % 4);
  return {
    id: `ORD-${10000 + i}`,
    date: new Date(Date.now() - i * 86400000 * 2).toISOString().slice(0, 10),
    items: itemsCount,
    total: item.price * itemsCount,
    status: (["Pending", "Shipped", "Delivered", "Delivered", "Cancelled"] as const)[i % 5],
    customer: ["Aarav Sharma", "Diya Patel", "Vihaan Singh", "Ishaan Kumar", "Anaya Reddy", "Kabir Mehta", "Saanvi Gupta", "Arjun Iyer"][i % 8],
    tracking: `TRK${Math.floor(100000000 + Math.random() * 899999999)}`,
  };
});

export const messages: Message[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `m${i + 1}`,
  from: sellers[i].name,
  avatar: sellers[i].image,
  preview: ["Yes, that product is in stock.", "Thanks for your order!", "We'll ship by tomorrow.", "Color options: Black, Blue.", "Discount applied successfully.", "Free delivery confirmed.", "Returns are easy — 7 days.", "Let us know if you need help."][i],
  time: `${1 + i}h ago`,
  unread: i < 3 ? 1 + i : 0,
}));

export const users = Array.from({ length: 100 }).map((_, i) => ({
  id: `u${i + 1}`,
  name: ["Aarav", "Diya", "Vihaan", "Ishaan", "Anaya", "Kabir", "Saanvi", "Arjun", "Myra", "Reyansh"][i % 10] + " " + ["Sharma", "Patel", "Singh", "Kumar", "Reddy"][i % 5],
  email: `user${i + 1}@example.com`,
  joined: `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`,
  orders: i % 12,
  status: i % 9 === 0 ? "Suspended" : "Active",
}));

export const revenueByMonth = [
  { month: "Jan", revenue: 42000, orders: 320 },
  { month: "Feb", revenue: 51000, orders: 410 },
  { month: "Mar", revenue: 48000, orders: 380 },
  { month: "Apr", revenue: 61000, orders: 470 },
  { month: "May", revenue: 73000, orders: 540 },
  { month: "Jun", revenue: 69000, orders: 510 },
  { month: "Jul", revenue: 82000, orders: 620 },
  { month: "Aug", revenue: 91000, orders: 700 },
  { month: "Sep", revenue: 86000, orders: 650 },
  { month: "Oct", revenue: 102000, orders: 770 },
  { month: "Nov", revenue: 118000, orders: 880 },
  { month: "Dec", revenue: 134000, orders: 990 },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getSeller = (id: string) => sellers.find((s) => s.id === id);
export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
