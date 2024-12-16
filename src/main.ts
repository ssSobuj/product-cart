import "./global.css";

import ProductCard, { ProductDetailsType } from "@core/ProductCard";
const app = document.getElementById("app");
const products: ProductDetailsType[] = [
  {
    name: "Classy Modern Smart Watch",
    id: "product-001",
    defaultImage: "public/product-images/purple.png",
    images: [
      {
        color: "purple",
        image: "public/product-images/purple.png",
      },
      {
        color: "blue",
        image: "public/product-images/blue.png",
      },
      {
        color: "green",
        image: "public/product-images/green.png",
      },
      {
        color: "black",
        image: "public/product-images/black.png",
      },
    ],
    colors: [
      { name: "purple", colorCode: "#816BFF" },
      { name: "green", colorCode: "#1FCEC9" },
      { name: "blue", colorCode: "#4B97D3" },
      { name: "black", colorCode: "#3B4747" },
    ],
    stock: 10,
    ratings: 3.5,
    reviews: 2,
    productDescription:
      "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
    productType: "Watch",
    modelNumber: "Forerunner 290XT",
    isFavorite: false,
    defaultColor: "purple",
    defaultSize: "S",
    defaultPrice: 99,
    discountPrice: 79,
    priceBySize: {
      S: 69,
      M: 79,
      L: 89,
      XL: 99,
    },
  },
];

const productCard = new ProductCard(products[0]);

// app!.innerHTML = productCard.render();
