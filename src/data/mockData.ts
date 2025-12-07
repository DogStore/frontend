import type { Product } from "./product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Dry Dog Food",
    price: 22.99,
    category: "food",
    country: "Cambodia",
    image: "https://www.postconsumerbrands.com/wp-content/uploads/2024/03/Kibblesn-Bits-Original-Beef-Chicken-Dry-Dog-Food-3.5LB-1024x1024.png",
    
  },
  {
    id: 2,
    name: "Chicken Meal Wet Dog Food",
    price: 19.5,
    category: "food",
    country: "France",
    image: "https://www.naturesrecipe.com/wp-content/uploads/2024/04/Natures-Recipe-Grain-Free-Puppy-Chicken-Sweet-Potato-Pumpkin-Recipe-Dry-Dog-Food-4-LB.png"
  },
  {
    id: 3,
    name: "Beef Flavored Dog Treats",
    price: 15.0,
    category: "food",
    country: "Australia",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 4,
    name: "Dog Hoodie Winter Edition",
    price: 29.99,
    category: "cloth",
    country: "Cambodia",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 5,
    name: "Puppy Raincoat",
    price: 24.99,
    category: "cloth",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 6,
    name: "Soft Dog T-Shirt",
    price: 12.5,
    category: "cloth",
    country: "Australia",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 7,
    name: "Chew Rope Toy",
    price: 9.99,
    category: "toy",
    country: "Cambodia",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 8,
    name: "Interactive Ball Toy",
    price: 14.5,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 9,
    name: "Bone Rubber Chew Toy",
    price: 11.99,
    category: "toy",
    country: "Australia",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 10,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "food",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 11,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 12,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 13,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 14,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
  {
    id: 15,
    name: "Duck Flavored Dog Treats",
    price: 18.99,
    category: "toy",
    country: "France",
    image: "https://www.harringtonspetfood.com/cdn/shop/files/1.7kg-Puppy-Turkey-FOP-ISO-comp.png?v=1723735752"
  },
];




export const products: Product[] = [
  // -----------------------------------------------------------
  // CLOTH — Quilted Coats, Jackets, Clothing
  // -----------------------------------------------------------
  {
    id: 1,
    name: "Quilted Dog Coat",
    price: 23.99,
    rating: 4.5,
    category: "cloth",
    country: "France",

    images: [
      "https://picsum.photos/seed/cloth1/450/450",
      "https://picsum.photos/seed/cloth1b/450/450",
      "https://picsum.photos/seed/cloth1c/450/450",
      "https://picsum.photos/seed/cloth1d/450/450",
    ],

    variants: [
      { label: "30cm", price: 23.99 },
      { label: "40cm", price: 25.99 },
      { label: "50cm", price: 24.99 },
      { label: "60cm", price: 32.99 },
      { label: "70cm", price: 35.99 },
    ],

    description:
      "Recommended for Corgis, Jack Russells, Mini Dachshunds, and similar-sized pups.",
  },

  {
    id: 2,
    name: "Winter Dog Jacket",
    price: 29.99,
    rating: 4.4,
    category: "cloth",
    country: "Cambodia",

    images: [
      "https://picsum.photos/seed/cloth2/450/450",
      "https://picsum.photos/seed/cloth2b/450/450",
    ],

    variants: [
      { label: "S", price: 29.99 },
      { label: "M", price: 31.49 },
      { label: "L", price: 33.49 },
    ],

    description:
      "A warm insulated jacket suitable for cold-weather dog walks.",
  },

  {
    id: 3,
    name: "Rain Dog Coat",
    price: 24.99,
    rating: 4.0,
    category: "cloth",
    country: "Australia",

    images: [
      "https://picsum.photos/seed/cloth3/450/450",
    ],

    variants: [
      { label: "XS", price: 24.99 },
      { label: "S", price: 26.99 },
      { label: "M", price: 28.49 },
    ],

    description:
      "Lightweight waterproof coat perfect for rainy days.",
  },

  {
    id: 4,
    name: "Dog Hoodie",
    price: 18.99,
    rating: 4.6,
    category: "cloth",
    country: "France",

    images: [
      "https://picsum.photos/seed/cloth4/450/450",
    ],

    variants: [
      { label: "S", price: 18.99 },
      { label: "M", price: 19.99 },
      { label: "L", price: 20.99 },
    ],

    description: "A comfortable cotton hoodie for your stylish pup.",
  },

  {
    id: 5,
    name: "Soft Dog Pajamas",
    price: 16.49,
    rating: 4.2,
    category: "cloth",
    country: "Cambodia",

    images: [
      "https://picsum.photos/seed/cloth5/450/450",
    ],

    variants: [
      { label: "S", price: 16.49 },
      { label: "M", price: 17.49 },
      { label: "L", price: 19.49 },
    ],

    description: "Made with soft fleece for maximum bedtime comfort.",
  },

  {
    id: 6,
    name: "Mini Dog Sneakers",
    price: 21.99,
    rating: 4.3,
    category: "cloth",
    country: "France",
    images: ["https://picsum.photos/seed/cloth6/450/450"],
    variants: [{ label: "One Size", price: 21.99 }],
    description: "Protect your dog's paws during walks.",
  },

  {
    id: 7,
    name: "Dog Backpack Harness",
    price: 27.89,
    rating: 4.5,
    category: "cloth",
    country: "Australia",
    images: ["https://picsum.photos/seed/cloth7/450/450"],
    variants: [{ label: "Adjustable", price: 27.89 }],
    description: "Perfect for small outdoor adventures.",
  },

  {
    id: 8,
    name: "Premium Dry Dog Food",
    price: 22.99,
    rating: 4.5,
    category: "cloth",
    country: "France",

    images: [
      "https://picsum.photos/seed/food1/450/450",
    ],

    variants: [
      { label: "1kg", price: 22.99 },
      { label: "3kg", price: 39.99 },
    ],

    description: "High-protein dry kibble made for active dogs.",
  },

  {
    id: 9,
    name: "Organic Wet Dog Food",
    price: 19.99,
    rating: 4.1,
    category: "food",
    country: "Cambodia",

    images: ["https://picsum.photos/seed/food2/450/450"],
    variants: [{ label: "400g", price: 19.99 }],
    description: "Organic ingredients slow-cooked for maximum nutrition.",
  },

  {
    id: 10,
    name: "Beef Flavored Dog Treats",
    price: 12.49,
    rating: 4.7,
    category: "food",
    country: "Australia",

    images: ["https://picsum.photos/seed/food3/450/450"],
    variants: [{ label: "Small Bag", price: 12.49 }],
    description: "Chewy beef treats that dogs love.",
  },

  {
    id: 11,
    name: "Chicken Bites Snack",
    price: 15.29,
    rating: 4.3,
    category: "food",
    country: "France",

    images: ["https://picsum.photos/seed/food4/450/450"],
    variants: [{ label: "Small Bag", price: 15.29 }],
    description: "Crunchy chicken-flavored treats.",
  },

  {
    id: 12,
    name: "Healthy Puppy Food",
    price: 25.99,
    rating: 4.8,
    category: "food",
    country: "Australia",

    images: ["https://picsum.photos/seed/food5/450/450"],
    variants: [{ label: "2kg", price: 25.99 }],
    description: "Formulated for growing puppies.",
  },

  {
    id: 13,
    name: "Dental Chew Stick",
    price: 11.59,
    rating: 4.2,
    category: "food",
    country: "France",
    images: ["https://picsum.photos/seed/food6/450/450"],
    variants: [{ label: "Pack of 5", price: 11.59 }],
    description: "Reduces tartar buildup and improves dental health.",
  },

  {
    id: 14,
    name: "Air-Dried Lamb Dog Food",
    price: 34.99,
    rating: 4.9,
    category: "food",
    country: "Australia",
    images: ["https://picsum.photos/seed/food7/450/450"],
    variants: [{ label: "1kg", price: 34.99 }],
    description: "Premium lamb food with no preservatives.",
  },

  // -----------------------------------------------------------
  // TOYS — Balls, Chew Toys, Squeaky
  // -----------------------------------------------------------
  {
    id: 15,
    name: "Rubber Chewing Bone",
    price: 9.99,
    rating: 4.8,
    category: "toy",
    country: "France",
    images: ["https://picsum.photos/seed/toy1/450/450"],
    variants: [{ label: "One Size", price: 9.99 }],
    description: "Durable rubber chew bone for strong chewers.",
  },

  {
    id: 16,
    name: "Squeaky Dog Duck",
    price: 7.99,
    rating: 4.1,
    category: "toy",
    country: "Australia",
    images: ["https://picsum.photos/seed/toy2/450/450"],
    variants: [{ label: "One Size", price: 7.99 }],
    description: "Soft squeaky duck for playful pups.",
  },

  {
    id: 17,
    name: "Rope Pull Toy",
    price: 14.99,
    rating: 4.9,
    category: "toy",
    country: "Cambodia",
    images: ["https://picsum.photos/seed/toy3/450/450"],
    variants: [{ label: "One Size", price: 14.99 }],
    description: "Strong rope toy ideal for tug-of-war.",
  },

  {
    id: 18,
    name: "Tennis Ball Pack (3pcs)",
    price: 6.99,
    rating: 4.4,
    category: "toy",
    country: "France",
    images: ["https://picsum.photos/seed/toy4/450/450"],
    variants: [{ label: "3 Balls", price: 6.99 }],
    description: "High-bounce tennis balls for fetch games.",
  },

  {
    id: 19,
    name: "Interactive Treat Toy",
    price: 17.49,
    rating: 4.6,
    category: "toy",
    country: "Australia",
    images: ["https://picsum.photos/seed/toy5/450/450"],
    variants: [{ label: "One Size", price: 17.49 }],
    description: "Dispenses treats as your dog plays.",
  },

  {
    id: 20,
    name: "Snuffle Feeding Mat",
    price: 23.49,
    rating: 4.7,
    category: "toy",
    country: "Cambodia",
    images: ["https://picsum.photos/seed/toy6/450/450"],
    variants: [{ label: "Standard", price: 23.49 }],
    description: "Slow-feeding puzzle mat to stimulate your dog's brain.",
  },
]
