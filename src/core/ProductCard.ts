export interface ProductDetails {
  name: string;
  price: number;
  id: string;
  image: string;
  colors: string[];
  quantity: number;
  isFavorite: boolean;
  selectedColor: string;
  selectedSize: string;
}

// Add new types for the observer pattern
type ProductCardEvent = 'colorChange' | 'sizeChange' | 'favoriteChange' | 'quantityChange';
type Observer = (event: ProductCardEvent, data: any) => void;

class ProductCard {
  name: string;
  price: number;
  id: string;
  image: string;
  colors: string[];
  quantity: number;
  isFavorite: boolean;
  selectedColor: string;
  selectedSize: string;
  private domRefs = {
    colorSelector: document.querySelector(".color-selector"),
    sizeSelector: document.querySelector(".size-selector"),
    favoriteButton: document.querySelector(".favorite-button"),
  }
  private observers: Observer[] = [];

  constructor(productDetails: ProductDetails) {
    if (!productDetails) throw new Error("Product details are required");
    this.name = productDetails.name;
    this.price = productDetails.price;
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.colors = productDetails.colors;
    this.quantity = productDetails.quantity;
    this.isFavorite = productDetails.isFavorite;
    this.selectedColor = productDetails.selectedColor;
    this.selectedSize = productDetails.selectedSize;
  }

  // Add observer methods
  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  private notify(event: ProductCardEvent, data: any): void {
    this.observers.forEach(observer => observer(event, data));
  }

  private selectColor(color: string) {
    this.selectedColor = color;
    this.notify('colorChange', { color });
    this.updateUI();
  }

  private selectSize(size: string) {
    this.selectedSize = size;
    this.notify('sizeChange', { size });
    this.updateUI();
  }

  private toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.notify('favoriteChange', { isFavorite: this.isFavorite });
    this.updateUI();
  }

  private increaseQuantity() {
    this.quantity++;
    this.notify('quantityChange', { quantity: this.quantity });
    this.updateUI();
  }

  private decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.notify('quantityChange', { quantity: this.quantity });
      this.updateUI();
    }
  }

  private updateUI() {
  }
  private render() {
  }
}
export default ProductCard;
