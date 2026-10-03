import churros from "@/assets/churros.jpg";
import toasted from "@/assets/toasted.jpg";
import coldDrinks from "@/assets/cold-drinks-accurate.jpg";
import hotDrinks from "@/assets/hot-drinks.jpg";
import desserts from "@/assets/desserts.jpg";
import signatures from "@/assets/signatures.jpg";

export type MenuItem = { name: string; price: string; description?: string };
export type MenuSection = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  items: MenuItem[];
  note?: string;
};

export const sections: MenuSection[] = [
  {
    id: "churros", title: "Churros", kicker: "01 / THE CLASSIC", description: "Golden, crisp, and made for dipping.", image: churros,
    imageAlt: "Golden cinnamon-sugar churros in a pink cup beside chocolate dipping sauce",
    items: [
      { name: "4 pieces", price: "120" }, { name: "6 pieces", price: "150" },
      { name: "8 pieces", price: "190" }, { name: "12 pieces", price: "230" },
      { name: "24 pieces", price: "400" },
    ],
    note: "Extra sauce +15 EGP · Chocolate / Caramel / Pistachio / Kinder",
  },
  {
    id: "toasted", title: "Toasted", kicker: "02 / SOMETHING SAVORY", description: "A little something between the sweet moments.", image: toasted,
    imageAlt: "Triple-decker toasted turkey and cheese sandwich with lettuce and tomato",
    items: [
      { name: "Labna Za’ater", price: "80" }, { name: "Sausage eggs", price: "120" },
      { name: "Filled Cream", price: "95" }, { name: "Turkey Cheese", price: "105" },
      { name: "Double Cheese", price: "105" }, { name: "Omelette Cheese", price: "105" },
      { name: "Bastrma Cheese", price: "110" },
    ],
  },
  {
    id: "hot-drinks", title: "Hot drinks", kicker: "03 / SLOW SIPS", description: "For taking your time, one cup at a time.", image: hotDrinks,
    imageAlt: "Freshly poured café latte with heart-shaped latte art in a pink cup",
    items: [
      { name: "Tea", price: "30" }, { name: "Kark Tea", price: "65" }, { name: "Hot Seder", price: "80" },
      { name: "Cappuccino", price: "85" }, { name: "Latte", price: "85" }, { name: "Mocha", price: "90" },
      { name: "Mocha Caramel · Hazelnut", price: "105" }, { name: "Mochachino", price: "115" },
      { name: "Espresso", price: "55 / 65", description: "Single / Double" },
      { name: "Espresso Macchiato", price: "55 / 65", description: "Single / Double" },
      { name: "Americano", price: "70" }, { name: "Macchiato", price: "70" }, { name: "Cortado", price: "75" },
      { name: "Turkish Coffee", price: "40 / 50", description: "Single / Double" },
      { name: "French Coffee", price: "60 / 70" }, { name: "Hazelnut Coffee", price: "60 / 70" },
      { name: "Caramel Macchiato", price: "110" }, { name: "Salted Caramel Latte", price: "115" },
      { name: "Flat White", price: "100" }, { name: "Hot Chocolate", price: "100" },
      { name: "White Chocolate", price: "100" }, { name: "Creamy Hot Chocolate", price: "110" },
    ],
  },
  {
    id: "cold-drinks", title: "Cold drinks", kicker: "04 / COOL THINGS DOWN", description: "Iced, blended, and always a good idea.", image: coldDrinks,
    imageAlt: "Iced strawberry matcha latte, iced mocha, and iced latte in clear cups",
    items: [
      { name: "Iced Americano", price: "85" }, { name: "Iced Mocha", price: "100" },
      { name: "Iced Latte", price: "95" }, { name: "Iced Spanish Latte", price: "100" },
      { name: "Iced Caramel Macchiato", price: "100" }, { name: "Matcha Latte (Strawberry)", price: "100" },
      { name: "Frappe", price: "120" }, { name: "Frappuccino", price: "120" },
      { name: "Mojito", price: "95" }, { name: "Juices", price: "90" },
      { name: "Smoothies", price: "90" }, { name: "Milk Shake", price: "90" },
      { name: "Red Bull", price: "90" }, { name: "V Cola", price: "40" }, { name: "Water", price: "10" },
    ],
  },
  {
    id: "desserts", title: "Desserts", kicker: "05 / THE SWEET STUFF", description: "A sweet ending is always worth it.", image: desserts,
    imageAlt: "Golden waffle topped with ice cream, strawberries, and chocolate drizzle",
    items: [
      { name: "Mini Pancake", price: "80 / 120", description: "12 pieces / 24 pieces" },
      { name: "Waffle", price: "100 / 60", description: "Classic / Sticks" },
      { name: "Crepe Roll", price: "90" }, { name: "Donuts", price: "75" },
      { name: "Mini Cookie", price: "90" }, { name: "Brownie Cup", price: "80" },
    ],
    note: "Extra sauces +15 EGP · Chocolate / Lotus / Caramel / Kinder / Pistachio / Fruits",
  },
  {
    id: "signatures", title: "Signatures", kicker: "06 / ONLY AT BONITA", description: "Our favorite creations, made to stay on your mind.", image: signatures,
    imageAlt: "Three signature mini pancake desserts with chocolate, strawberry, and caramel toppings",
    items: [
      { name: "∞ Bonita Infinity", price: "185", description: "White chocolate, caramel sauce, vanilla cream, chocolate chips" },
      { name: "∞ Pink Dream", price: "170", description: "Strawberry sauce, white chocolate, fresh strawberries, pink cookies" },
      { name: "∞ Spanish Sunset", price: "170", description: "Caramel, Lotus & crunch, vanilla cream, Lotus biscuit" },
    ],
  },
];
