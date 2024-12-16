export interface ProductDetailsType {
  name: string;
  priceBySize: { [size: string]: number };
  id: string;
  image: string;
  colors: string[];
  stock: number;
  isFavorite: boolean;
  defaultColor: string;
  defaultSize: string;
}
export interface ProductType {
  name: string;
  price: number;
  id: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

const products: ProductDetailsType[] = [
  {
    name: "Classic T-Shirt",
    id: "product-001",
    image: "classic-tshirt.jpg",
    colors: ["red", "blue", "white"],
    stock: 10,
    isFavorite: false,
    defaultColor: "red",
    defaultSize: "M",
    priceBySize: {
      S: 19.99,
      M: 24.99,
      L: 29.99,
    },
  },
  {
    name: "Running Shoes",
    id: "product-002",
    image: "running-shoes.jpg",
    colors: ["black", "gray", "white"],
    stock: 5,
    isFavorite: true,
    defaultColor: "black",
    defaultSize: "10",
    priceBySize: {
      "8": 49.99,
      "9": 54.99,
      "10": 59.99,
    },
  },
  {
    name: "Denim Jacket",
    id: "product-003",
    image: "denim-jacket.jpg",
    colors: ["blue", "black"],
    stock: 8,
    isFavorite: false,
    defaultColor: "blue",
    defaultSize: "L",
    priceBySize: {
      S: 59.99,
      M: 69.99,
      L: 79.99,
      XL: 89.99,
    },
  },
];

class ProductCardRenderer {
  private domRefs = {
    get colorSelector() {
      return document.querySelector(".color-selector");
    },
    get sizeSelector() {
      return document.querySelector(".size-selector");
    },
    get favoriteButton() {
      return document.querySelector(".favorite-button");
    },
  };

  /**
   * Updates the color selector UI elements
   * @protected
   */
  protected updateColorsUi(): void {
  }

  /**
   * Updates the quantity display UI elements
   * @protected
   */
  protected updateQuantityUi(): void {
  }

  /**
   * Updates the size selector UI elements
   * @protected
   */
  protected updateSizesUi(): void {
  }

  /**
   * Updates the favorite button UI state
   * @protected
   */
  protected updateFavoriteUi(): void {
  }

  /**
   * Renders the initial product card UI
   * @protected
   */
  protected render(): void {
  }
}

class ProductCard extends ProductCardRenderer {
  private productDetails: ProductDetailsType;
  private stock: number;
  private isFavorite: boolean;
  private selectedColor: string;
  private priceBySize: { [size: string]: number };
  private selectedSize: string;
  private cartQuantity: number = 0;

  /**
   * Initializes a new ProductCard instance
   * @param productDetails - The details of the product including name, price, stock, etc.
   * @throws {Error} If productDetails is not provided
   */
  constructor(productDetails: ProductDetailsType) {
    super();
    if (!productDetails) throw new Error("Product details are required");
    this.productDetails = productDetails;
    this.priceBySize = productDetails.priceBySize;
    this.stock = productDetails.stock;
    this.isFavorite = productDetails.isFavorite;
    this.selectedColor = productDetails.defaultColor;
    this.selectedSize = productDetails.defaultSize;
    this.init();
  }

  /**
   * Initializes event listeners and renders the initial UI
   * @private
   */
  private init() {
    this.render();
    window.addEventListener("addToCart", this.addToCart);
  }

  /**
   * Handles adding the current product to the cart
   * Dispatches a custom 'addToCart' event with the product details
   */
  addToCart = (): void => {
    const product: ProductType = {
      name    : this.productDetails.name,
      id      : this.productDetails.id,
      image   : this.productDetails.image,
      color   : this.selectedColor,
      price   : this.priceBySize[this.selectedSize],
      size    : this.selectedSize,
      quantity: this.cartQuantity,
    };
    const event = new CustomEvent("addToCart", { detail: product });
    window.dispatchEvent(event);
  };

  /**
   * Updates the selected color of the product
   * @param color - The new color to select
   * @private
   */
  private selectColor(color: string) {
    this.selectedColor = color;
    this.updateColorsUi();
  }

  /**
   * Updates the selected size of the product
   * @param size - The new size to select
   * @private
   */
  private selectSize(size: string) {
    this.selectedSize = size;
    this.updateSizesUi();
  }

  /**
   * Toggles the favorite status of the product
   * @private
   */
  private toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.updateFavoriteUi();
  }

  /**
   * Increases the cart quantity by 1 if stock is available
   * Updates both cart quantity and available stock
   * @private
   */
  private increaseQuantity() {
    if (this.cartQuantity < this.stock) {
      this.cartQuantity++;
      this.stock--;
      this.updateQuantityUi();
    }
  }

  /**
   * Decreases the cart quantity by 1 if cart is not empty
   * Updates both cart quantity and available stock
   * @private
   */
  private decreaseQuantity() {
    if (this.cartQuantity > 0) {
      this.cartQuantity--;
      this.stock++;
      this.updateQuantityUi();
    }
  }
}

export default ProductCard;
