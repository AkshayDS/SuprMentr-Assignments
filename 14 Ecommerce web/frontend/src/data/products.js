// ============================================================
// data/products.js — Product Catalog (Prices in ₹ INR)
// ============================================================

const products = [
  // ===================== RACKETS =====================
  {
    id: 1,
    name: "Yonex GR-303i Badminton Racket",
    description:
      "The Yonex GR-303i is a lightweight, durable aluminum-frame racket perfect for beginners and intermediate players. Its isometric head shape enlarges the sweet spot, giving you more power and accuracy on every shot.",
    price: 2999,
    category: "Rackets",
    image: "/images/racket1.png",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Li-Ning G-Force Superlite 3600",
    description:
      "A head-heavy design built for powerful smashes. The G-Force Superlite 3600 features a high-modulus graphite frame and Dynamic Optimum Frame technology for unmatched control and aggression.",
    price: 6999,
    category: "Rackets",
    image: "/images/racket3.png",
    inStock: true,
    featured: true,
  },
  {
    id: 7,
    name: "Victor Thruster K Falcon Racket",
    description:
      "Built for competition. The Thruster K Falcon combines an aerodynamic frame with a stiff shaft to deliver explosive power and fast swing speed. Used by professional players worldwide.",
    price: 9999,
    category: "Rackets",
    image: "/images/racket5.png",
    inStock: false,
    featured: false,
  },
  {
    id: 9,
    name: "Yonex Astrox 99 Pro",
    description:
      "The Astrox 99 Pro is designed for maximum attacking power. Rotational Generator System distributes weight throughout the frame and shaft for a continuous, heavy hitting experience.",
    price: 16499,
    category: "Rackets",
    image: "/images/racket4.png",
    inStock: true,
    featured: true,
  },
  {
    id: 10,
    name: "Wilson Pro Staff Tennis Racket",
    description:
      "An iconic tennis racket with a sleek, matte black design. Braided graphite for a solid, stable feel. Used by Roger Federer for decades, the Pro Staff delivers precision and finesse.",
    price: 12499,
    category: "Rackets",
    image: "/images/racket2.png",
    inStock: true,
    featured: false,
  },

  // ===================== ACCESSORIES =====================
  {
    id: 3,
    name: "Yonex Mavis 350 Shuttlecocks (6-Pack)",
    description:
      "Highly durable nylon shuttlecocks that deliver flight performance remarkably close to natural feather shuttles. The Mavis 350 features a unique skirt design for consistent shuttle speed.",
    price: 1249,
    category: "Accessories",
    image: "/images/shuttle1.png",
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: "Ashaway Super Grip 3-Pack",
    description:
      "An extra tacky and supremely comfortable overgrip designed to prevent racket slipping during intense rallies. Excellent moisture absorption keeps your hands dry.",
    price: 749,
    category: "Accessories",
    image: "/images/grip1.png",
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "Premium Badminton Kit Bag",
    description:
      "A spacious 6-racket kit bag with dedicated compartments for shoes, apparel, and accessories. Features padded shoulder straps, heavy-duty zippers, and a ventilated shoe compartment.",
    price: 4549,
    category: "Accessories",
    image: "/images/bag1.png",
    inStock: true,
    featured: true,
  },
  {
    id: 11,
    name: "Feather Shuttlecocks (12-Pack)",
    description:
      "Tournament-grade goose feather shuttlecocks with a natural cork base. Provides the authentic flight pattern and speed that competitive players demand. Approved for league-level play.",
    price: 2299,
    category: "Accessories",
    image: "/images/shuttle2.png",
    inStock: true,
    featured: false,
  },
  {
    id: 12,
    name: "Yonex Badminton Net (Standard)",
    description:
      "Official tournament-height badminton net with reinforced edges and sturdy steel cable. Easy to set up and built to last. Meets BWF standards at 5'1\" height.",
    price: 3499,
    category: "Accessories",
    image: "/images/net1.png",
    inStock: true,
    featured: false,
  },
  {
    id: 13,
    name: "Wristbands & Headband Combo",
    description:
      "Comfort cotton-terry sweatbands to keep sweat out of your eyes during intense rallies. Includes two wristbands and one headband. Machine washable, available in multiple colors.",
    price: 799,
    category: "Accessories",
    image: "/images/wristband1.png",
    inStock: true,
    featured: false,
  },

  // ===================== FOOTWEAR =====================
  {
    id: 14,
    name: "Yonex Power Cushion 65 Z3",
    description:
      "Lightweight and shock-absorbing badminton shoes with Yonex's signature Power Cushion technology. The round-sole design provides smooth, quick footwork transitions. Non-marking gum rubber sole.",
    price: 8999,
    category: "Footwear",
    image: "/images/shoes1.png",
    inStock: true,
    featured: true,
  },
  {
    id: 15,
    name: "Li-Ning Saga II Court Shoes",
    description:
      "Designed for agility and comfort on the court. Cloud-Lite foam midsole offers excellent cushioning while the Tuff Tip toe cap protects during lunges. Anti-slip rubber outsole for grip.",
    price: 6199,
    category: "Footwear",
    image: "/images/shoes2.png",
    inStock: true,
    featured: false,
  },

  // ===================== APPAREL =====================
  {
    id: 5,
    name: "Men's Dry-Fit Sports T-Shirt",
    description:
      "Engineered for peak performance, this breathable and sweat-wicking t-shirt keeps you cool and dry during the most intense matches. Features flatlock seams to minimize chafing.",
    price: 1999,
    category: "Apparel",
    image: "/images/tshirt1.png",
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Women's Sports Skort",
    description:
      "A comfortable and stylish athletic skort with built-in compression shorts for added support. Made from moisture-wicking fabric with 4-way stretch. Features a secure back pocket.",
    price: 2499,
    category: "Apparel",
    image: "/images/skort1.png",
    inStock: true,
    featured: false,
  },
  {
    id: 16,
    name: "Compression Sports Socks (3-Pair)",
    description:
      "Arch-support compression socks designed for high-impact court sports. Reinforced heel and toe for durability. Moisture-wicking fabric keeps feet cool and blister-free during long matches.",
    price: 1499,
    category: "Apparel",
    image: "/images/socks1.png",
    inStock: true,
    featured: false,
  },
];

export default products;
