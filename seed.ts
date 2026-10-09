import { createDb } from "./db/client";
import { products } from "./db/schema";

export const seedProducts = [
  {
    id: 1,
    title: "Relaxing Spa Gift Set",
    description:
      "A calming collection of spa essentials for a relaxing self-care experience.",
    image: "",
    affiliateNetwork: "amazon",
    affiliateUrl: "",
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Natural Spa Gift Basket",
    description:
      "A thoughtful spa-inspired gift with natural products for a soothing at-home ritual.",
    image: "",
    affiliateNetwork: "amazon",
    affiliateUrl: "",
    createdAt: Date.now(),
  },
  {
    id: 3,
    title: "Pampering Self-Care Set",
    description:
      "A simple collection of pampering essentials designed to create a relaxing spa experience at home.",
    image: "",
    affiliateNetwork: "amazon",
    affiliateUrl: "",
    createdAt: Date.now(),
  },
  {
    id: 4,
    title: "Beginner Home Exercise Kit",
    description:
      "A practical selection of fitness essentials for simple workouts at home.",
    image: "",
    affiliateNetwork: "amazon",
    affiliateUrl: "",
    createdAt: Date.now(),
  },
  {
    id: 5,
    title: "Healthy Food Gift Set",
    description:
      "A useful collection of food-related essentials for preparing healthy meals and snacks.",
    image: "",
    affiliateNetwork: "amazon",
    affiliateUrl: "",
    createdAt: Date.now(),
  },
];

export async function seed(d1: D1Database) {
  const db = createDb(d1);

  await db.insert(products).values(seedProducts).onConflictDoNothing();

  console.log("Seed data inserted successfully!");
}
