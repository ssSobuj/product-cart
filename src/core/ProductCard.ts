export interface ProductDetailsType {
  name: string;
  priceBySize: { [size: string]: number };
  id: string;
  colors: { name: string; colorCode: string }[];
  images: { color: string; image: string }[];
  defaultImage: string;
  stock: number;
  ratings: number;
  reviews: number;
  productDescription: string;
  productType: string;
  modelNumber: string;
  isFavorite: boolean;
  defaultColor: string;
  defaultSize: string;
  defaultPrice: number;
  discountPrice: number;
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

class ProductCardRenderer {
  protected productDetails: ProductDetailsType = {
    name: "",
    priceBySize: {},
    id: "",
    defaultImage: "",
    images: [],
    colors: [],
    stock: 0,
    ratings: 0,
    reviews: 0,
    productDescription: "",
    productType: "",
    modelNumber: "",
    isFavorite: false,
    defaultColor: "",
    defaultSize: "",
    defaultPrice: 0,
    discountPrice: 0,
  };

  protected domRefs = () => {
    const id = this.productDetails.id;
    return {
      get colorSelectors(): HTMLButtonElement[] {
        return Array.from(
          document.querySelectorAll(`#${id}-color-buttons button`)
        );
      },
      get productImage(): HTMLImageElement {
        return document.querySelector(`#${id}-product-image`)!;
      },
      get sizeSelectors(): HTMLButtonElement[] {
        return Array.from(
          document.querySelectorAll(`#${id}-size-button button`)
        );
      },
      get favoriteButton(): HTMLButtonElement {
        return document.querySelector(`#${id}-favorite-button`)!;
      },
      get addToCartButton(): HTMLButtonElement {
        return document.querySelector(`#${id}-add-to-cart`)!;
      },
      get decreaseButton(): HTMLButtonElement {
        return document.querySelector(`#${id}-decrease`)!;
      },
      get increaseButton(): HTMLButtonElement {
        return document.querySelector(`#${id}-increase`)!;
      },
      get quantityLabel(): HTMLSpanElement {
        return document.querySelector(`#${id}-quantity-label`)!;
      },
    };
  };
  protected selectedColor: string = "";
  protected selectedSize: string = "";
  protected cartQuantity: number = 1;
  protected isFavorite: boolean = false;
  protected priceBySize: { [size: string]: number } = {};
  protected stock: number = 0;
  protected selectColor(color: string): void {
    throw new Error("Method not implemented.");
  }
  protected selectSize(size: string): void {
    throw new Error("Method not implemented.");
  }
  protected toggleFavorite(): void {
    throw new Error("Method not implemented.");
  }
  protected increaseQuantity(): void {
    throw new Error("Method not implemented.");
  }
  protected decreaseQuantity(): void {
    throw new Error("Method not implemented.");
  }
  protected addToCart(): void {
    throw new Error("Method not implemented.");
  }

  public setupEventListeners(): void {
    this.domRefs().colorSelectors.forEach((button) =>
      button.addEventListener("click", (event: MouseEvent) => {
        const target = event.currentTarget as HTMLButtonElement;
        this.selectColor(target.dataset.color!);
      })
    );
    this.domRefs().sizeSelectors.forEach((button) =>
      button.addEventListener("click", (event: MouseEvent) => {
        const target = event.currentTarget as HTMLButtonElement;
        this.selectSize(target.dataset.size!);
      })
    );
    this.domRefs().favoriteButton.addEventListener("click", () =>
      this.toggleFavorite()
    );
    this.domRefs().addToCartButton.addEventListener("click", () =>
      this.addToCart()
    );

    this.domRefs().increaseButton.addEventListener("click", () =>
      this.increaseQuantity()
    );
    this.domRefs().decreaseButton.addEventListener("click", () =>
      this.decreaseQuantity()
    );
  }

  /**
   * Updates the color selector UI elements
   * @protected
   */
  protected updateColorsUi(): void {
    this.domRefs().productImage.src = this.productDetails.images.find(
      (image) => image.color === this.selectedColor
    )!.image;
    const colorCode = this.productDetails.colors.find(
      (color) => color.name === this.selectedColor
    )!.colorCode;
    this.domRefs().colorSelectors.forEach((button) => {
      button.classList.remove("ring-2", "ring-offset-2", "ring-[#6576FF");
      if (button.dataset.color === this.selectedColor) {
        button.classList.add("ring-2", "ring-offset-2", `ring-[${colorCode}]`);
      }
    });
  }

  /**
   * Updates the quantity display UI elements
   * @protected
   */
  protected updateQuantityUi(): void {
    this.domRefs().quantityLabel.textContent = this.cartQuantity.toString();
  }

  /**
   * Updates the size selector UI elements
   * @protected
   */
  protected updateSizesUi(): void {
    this.domRefs().sizeSelectors.forEach((button) => {
      button.classList.remove("border-[#6576FF]", "text-[#6576FF]");
      if (button.dataset.size === this.selectedSize) {
        button.classList.add("border-[#6576FF]", "text-[#6576FF]");
      }
    });
    this.domRefs().sizeSelectors.forEach((button) => {
      button.classList.remove("border-[#6576FF]", "text-[#6576FF]");
      button.firstElementChild?.classList.remove("text-[#6576FF]");
      if (button.dataset.size === this.selectedSize) {
        // Remove the default color class from the button and the span
        button.classList.remove("border-gray-300");
        button.firstElementChild?.classList.remove("text-[#364A63]");

        // Add select color class to the button and the span
        button.classList.add("border-[#6576FF]", "text-[#6576FF]");
        button.firstElementChild?.classList.add("text-[#6576FF]");
      }
    });
  }

  /**
   * Updates the favorite button UI state
   * @protected
   */
  protected updateFavoriteUi(): void {
    if (this.isFavorite) {
      this.domRefs().favoriteButton.classList.remove("text-transparent");
      this.domRefs().favoriteButton.classList.add("text-[#6576FF]");
    } else {
      this.domRefs().favoriteButton.classList.remove("text-[#6576FF]");
      this.domRefs().favoriteButton.classList.add("text-transparent");
    }
  }

  /**
   * Renders the initial product card UI
   * @protected
   */
  public render(): HTMLDivElement {
    const app = `
      <div class="rounded-lg w-full flex flex-col md:flex-row gap-x-[3.75rem] py-10">
        <!-- Left side - Image -->
        <div class="md:w-1/2 w-full rounded-lg flex items-center justify-center">
          <img 
            id="${this.productDetails.id}-product-image" 
            src="${this.productDetails.defaultImage}" 
            alt="${this.productDetails.name}" 
            class="w-full h-auto md:object-contain rounded max-h-[45.0625rem] max-w-[39.375rem]"
          >
        </div>
  
        <!-- Right side - Product Details -->
        <div class="md:w-1/2 w-full mt-5 md:mt-0 flex flex-col justify-center">
          <h1 class="text-[2.5rem] leading-[2.75rem] font-bold text-[#364A63] mb-3">
            ${this.productDetails.name}
          </h1>
          
          <!-- Ratings -->
          <div class="flex items-center gap-2  mb-[1.6875rem]">
            <div class="flex relative -left-1 justify-between">
              ${Array(5)
                .fill("")
                .map((_, i) => {
                  const roundedRating = Math.floor(this.productDetails.ratings);
                  const hasHalfStar = this.productDetails.ratings % 1 >= 0.5;

                  return `
                  <svg 
                    class="w-5 h-5 ${
                      i < roundedRating
                        ? "text-[#FFD200]"
                        : hasHalfStar && i === roundedRating
                        ? "text-[#FFD200]"
                        : "text-gray-300"
                    }" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                `;
                })
                .join("")}
            </div>
            <span class="text-[#8091A7] text-sm">(${
              this.productDetails.reviews
            } Reviews)</span>
          </div>
  
          <!-- Price -->
          <div class="flex items-center gap-[0.3125rem] mb-5">
            <span class="text-xl text-gray-400 line-through">
              $${this.productDetails.defaultPrice.toFixed(2)}
            </span>
            <span class="text-xl font-bold text-[#6576FF]">
              $${this.productDetails.discountPrice.toFixed(2)}
            </span>
          </div>
  
          <!-- Description -->
          <p class="text-[#8091A7] mb-6 leading-[1.875rem]">
            ${this.productDetails.productDescription}
          </p>
  
          <!-- Product Info -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span class="text-[#8091A7] text-sm leading-[1.44375rem]">Type</span>
              <p class="font-bold text-[#364A63]">${
                this.productDetails.productType
              }</p>
            </div>
            <div>
              <span class="text-[#8091A7] text-sm leading-[1.44375rem]">Model Number</span>
              <p class="font-bold text-[#364A63]">${
                this.productDetails.modelNumber
              }</p>
            </div>
          </div>
  
          <!-- Color Selection -->
          <div class="mb-6">
            <h3 class="text-[#364A63] font-bold mb-[0.625rem]">Band Color</h3>
            <div id="${
              this.productDetails.id
            }-color-buttons" class="flex gap-5 leading-5">
              ${this.productDetails.colors
                .map(
                  (color) => `
                <button 
                  data-color="${color.name}"
                  class="w-4 aspect-square rounded-full ${
                    color.name === this.selectedColor
                      ? `ring-2 ring-offset-2 ring-[${color.colorCode}]`
                      : ""
                  }"
                  style="background-color: ${color.colorCode}"
                ></button>
              `
                )
                .join("")}
            </div>
          </div>
  
          <!-- Size Selection -->
          <div class="mb-6">
            <h3 class="text-[#364A63] font-bold leading-5 mb-[0.625rem]">Wrist Size</h3>
            <div id="${this.productDetails.id}-size-button" class="flex gap-2">
              ${Object.entries(this.priceBySize)
                .map(
                  ([size, price]) => `
                <button 
                  class="px-[1.125rem] text-[#364A63] text-sm py-2 border rounded-md ${
                    size === this.selectedSize
                      ? "border-[#6576FF]"
                      : "border-gray-300"
                  }"
                  data-size="${size}"
                ><span class="font-bold ${
                  size === this.selectedSize
                    ? "text-[#6576FF]"
                    : "text-[#364A63]"
                }">${size}</span> <span class="text-[#8091A7]">$${price}</span></button>
              `
                )
                .join("")}
            </div>
          </div>
  
          <!-- Add to Cart -->
          <div class="flex gap-x-4">
            <div class="flex items-center border rounded-md">
              <button 
                id="${this.productDetails.id}-decrease" 
                class="px-4 py-2 text-[#8091A7] text-[1.1375rem] hover:text-[#6576FF]"
              >-</button>
              <span 
                id="${this.productDetails.id}-quantity-label" 
                class="px-[1.625rem] py-2 border-x"
              >${this.cartQuantity}</span>
              <button 
                id="${this.productDetails.id}-increase" 
                class="px-4 py-2 text-[#8091A7] text-[1.1375rem] hover:text-[#6576FF]"
              >+</button>
            </div>
            <div class="flex gap-x-4">
                <button 
                  id="${this.productDetails.id}-add-to-cart" 
                  class="bg-[#6576FF] text-white px-[1.125rem] py-2 rounded hover:bg-[#7C3AED]"
                >
                  Add to Cart
                </button>
                <button 
                  id="${this.productDetails.id}-favorite-button" 
                  class="p-2 rounded-md text-${
                    this.isFavorite ? "[#6576FF]" : "transparent"
                  }"
            >
              <svg class="w-6 h-6 fill-[currentColor] stroke-[#6576FF]" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = app;
    return div;
  }
}

class ProductCard extends ProductCardRenderer {
  protected productDetails: ProductDetailsType;
  protected stock: number;
  protected isFavorite: boolean;
  protected selectedColor: string;
  protected priceBySize: { [size: string]: number };
  protected selectedSize: string;
  protected cartQuantity: number = 1;

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
  }

  /**
   * Handles adding the current product to the cart
   * Dispatches a custom 'addToCart' event with the product details
   */
  addToCart = (): void => {
    const product: ProductType = {
      name: this.productDetails.name,
      id: this.productDetails.id,
      image: this.productDetails.images.find(
        (image) => image.color === this.selectedColor
      )!.image,
      color: this.selectedColor,
      price: this.priceBySize[this.selectedSize],
      size: this.selectedSize,
      quantity: this.cartQuantity,
    };
    const event = new CustomEvent("addToCart", { detail: product });
    window.dispatchEvent(event);
  };

  /**
   * Updates the selected color of the product
   * @param color - The new color to select
   * @public
   */
  public selectColor = (color: string) => {
    this.selectedColor = color;
    this.updateColorsUi();
  };

  /**
   * Updates the selected size of the product
   * @param size - The new size to select
   * @protected
   */
  protected selectSize(size: string) {
    this.selectedSize = size;
    this.updateSizesUi();
  }

  /**
   * Toggles the favorite status of the product
   * @protected
   */
  protected toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.updateFavoriteUi();
  }

  /**
   * Increases the cart quantity by 1 if stock is available
   * Updates both cart quantity and available stock
   * @protected
   */
  protected increaseQuantity() {
    if (this.cartQuantity < this.stock) {
      this.cartQuantity++;
      this.updateQuantityUi();
    }
  }

  /**
   * Decreases the cart quantity by 1 if cart is not empty
   * Updates both cart quantity and available stock
   * @protected
   */
  protected decreaseQuantity(): void {
    if (this.cartQuantity > 1) {
      this.cartQuantity -= 1;
      this.updateQuantityUi();
    }
  }
}

export default ProductCard;
