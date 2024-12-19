import { ProductType } from "./ProductCard";

class CheckoutCardRenderer {
  protected readonly domRef = {
    get openCart() {
      return document.getElementById("open-cart");
    },
    get continueShopping() {
      return document.getElementById("continue-shopping");
    },
    get checkoutButton() {
      return document.getElementById("checkout-button");
    },
    get checkoutModal() {
      return document.getElementById("checkout-modal");
    },
    get cartItems() {
      return document.getElementById("cart-items");
    },
    get totalPrice() {
      return document.getElementById("total-price");
    },
    get totalItems() {
      return document.getElementById("total-items");
    },
  };
  protected products: ProductType[] = [];
  protected checkoutCount: number = 0;

  public setupEventListeners() {
    this.domRef.openCart?.addEventListener("click", () => {
      this.domRef.checkoutModal?.classList.remove("hidden");
      this.updateCartItemsUI();
      this.updateTotalPriceUI();
      this.updateTotalItemsUI();
    });

    this.domRef.continueShopping?.addEventListener("click", () => {
      this.domRef.checkoutModal?.classList.add("hidden");
    });

    this.domRef.checkoutButton?.addEventListener("click", () => {
      // Handle checkout logic here
      console.log("Proceeding to checkout with items:", this.products);
    });
  }

  protected updateCartItemsUI() {
    this.domRef.cartItems!.innerHTML = this.products
      .map(
        (product) => `
      <div class="grid grid-cols-8 gap-4 py-4 border-b items-center">
        <div class="col-span-4 flex items-center gap-4">
          <img src="${product.image}" alt="${
          product.name
        }" class="w-16 h-16 object-cover rounded">
          <span class="font-medium text-[#364A63]">${product.name}</span>
        </div>
        <div class="capitalize">${product.color}</div>
        <div class="font-bold">${product.size}</div>
        <div class="font-bold">${product.quantity}</div>
        <div class="text-right font-bold">$${(
          product.price * product.quantity
        ).toFixed(2)}</div>
      </div>
    `
      )
      .join("");
  }

  protected updateTotalPriceUI() {
    const total = this.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    this.domRef.totalPrice!.textContent = total.toFixed(2);
  }

  protected updateTotalItemsUI() {
    const totalItems = this.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    this.domRef.totalItems!.textContent = totalItems.toString();
  }

  protected updateCheckoutCountUI() {
    const checkoutCountElement = document.getElementById("checkout-count");
    if (checkoutCountElement) {
      checkoutCountElement.textContent = this.checkoutCount.toString();
    }
  }

  protected renderModal() {
    const total = this.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const totalItems = this.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    return `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 w-[800px] max-h-[90vh] overflow-y-auto">
          <h2 class="text-3xl font-bold text-[#364A63] mb-6">Your Cart</h2>
          
          <!-- Headers -->
          <div class="grid grid-cols-8 gap-4 pb-4 border-b text-[#8094ae]">
            <div class="col-span-4">Item</div>
            <div>Color</div>
            <div ">Size</div> 
            <div ">Qnt</div> 
            <div class="text-right ">Price</div>
          </div>
  
          <!-- Cart Items -->
          <div id="cart-items">
            <!-- Dynamic content will be added here -->
          </div>
  
          <!-- Total -->
          <div class="grid grid-cols-8 gap-4 mt-6 mb-8">
            <div class="text-xl font-bold text-[#364A63] col-span-6">Total</div>
            <div id="total-items" class="text-xl font-bold text-[#364A63] ">${totalItems}</div>
            <div class="text-xl font-bold text-[#364A63]">$<span id="total-price">${total.toFixed(
              2
            )}</span></div>
          </div>
  
          <!-- Buttons -->
          <div class="flex justify-end gap-4">
            <button id="continue-shopping" class="px-6 py-3 border font-bold border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Continue Shopping
            </button>
            <button id="checkout-button" class="px-6 py-3 bg-[#6576FF] font-bold text-white rounded-md hover:bg-[#4b5bff]">
              Checkout
            </button>
          </div>
        </div>
      </div>
    `;
  }

  public render() {
    return `
      <div class="flex flex-col gap-4 fixed bottom-10 right-[50%] translate-x-[50%]">
        <button id="open-cart" class="flex items-center gap-2 bg-[#FFB84C] text-gray-700 px-6 py-3 rounded-full font-medium">
          <span>Checkout</span>
          <span id="checkout-count" class="bg-white px-2 py-0.5 rounded">0</span>
        </button>
      </div>
      <div id="checkout-modal" class="hidden">
        ${this.renderModal()}
      </div>
    `;
  }
}

class CheckoutCard extends CheckoutCardRenderer {
  protected products: ProductType[] = [];
  protected checkoutCount: number = 0;
  constructor() {
    super();
    window.addEventListener("addToCart", ((event: CustomEvent) => {
      this.addToCart(event.detail);
    }) as EventListener);
  }

  public addToCart(product: ProductType) {
    console.log("DISPATCHED", product);

    const productIndex = this.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      this.products[productIndex].quantity += product.quantity;
      this.updateCheckoutCountUI();
    } else {
      this.products.push(product);
      this.checkoutCount++;
      this.updateCheckoutCountUI();
    }
  }
}

export default CheckoutCard;
