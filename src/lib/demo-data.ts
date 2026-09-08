export type DemoListing = {
  id: string;
  seller: string;
  title: string;
  unit: string;
  quantity: number;
  price: number;
  retailPrice: number;
  distanceMiles: number;
  expiresIn: string;
  category: "Produce" | "Dry goods" | "Disposables";
};

export const demoListings: DemoListing[] = [
  {
    id: "demo-avocado",
    seller: "Sunset Kitchen",
    title: "Hass avocados, 48 count",
    unit: "case",
    quantity: 2,
    price: 38,
    retailPrice: 55,
    distanceMiles: 1.2,
    expiresIn: "2 days",
    category: "Produce",
  },
  {
    id: "demo-oil",
    seller: "Vine Street Pizza",
    title: "Canola frying oil, 35 lb",
    unit: "jug",
    quantity: 4,
    price: 27,
    retailPrice: 39,
    distanceMiles: 2.4,
    expiresIn: "5 days",
    category: "Dry goods",
  },
  {
    id: "demo-containers",
    seller: "Melrose Cafe",
    title: "9-inch compostable containers",
    unit: "case of 200",
    quantity: 3,
    price: 31,
    retailPrice: 44,
    distanceMiles: 3.1,
    expiresIn: "7 days",
    category: "Disposables",
  },
];
