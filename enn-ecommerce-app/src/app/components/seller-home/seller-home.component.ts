import { Component, OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService, Order } from '../../services/order.service';
import { Product, ProductService } from '../../services/product.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  
  // products: Product[] = [];
  // cartItems: Product[] = [];
  // userMessage: string = '';
  // product: any = {};
  // selectedFile: File | null = null;
  // constructor(
  //   private cartService: CartService,
  //   private orderService: OrderService,
  //   private productService: ProductService   // ✅ ProductService inject किया
  // ) {}


  // ngOnInit() {
  //   this.cartItems = this.cartService.getCartItems();
  //   // ✅ Products load from AWS RDS via backend
  //   this.productService.getAllProducts().subscribe({
  //     next: (data) => this.products = data,
  //     error: (err) => console.error('Failed to load products:', err)
  //   });
  // }

  // addToCart(product: Product) {
  //   // 1. Frontend cart update
  //   this.cartService.addToCart(product);
  //   this.cartItems = this.cartService.getCartItems();

  //    // 2. Save to backend order table
  //   const order: Order = {
  //     productId: product.id,
  //     productName: product.name,
  //     quantity: 1,
  //     price: product.price,
  //     customerName: 'Demo User',    // TODO: Replace with logged-in user
  //     customerEmail: 'demo@email.com'
  //   };

  //   this.orderService.createOrder(order).subscribe({
  //     next: () => alert(`${product.name} added to cart & saved to backend!`),
  //     error: (err) => {
  //       console.error(err);
  //       alert('❌ Failed to save order to backend');
  //     }
  //   });
    
  //   alert(`${product.name} added to cart!`);
  // }

  // buyNow(product: Product) {
  //   this.orderService.notifyPurchase(product.id.toString(), product.name, 'demo@email.com', this.userMessage ).subscribe({
  //     next: () => alert(`Purchase notification sent for ${product.name}`),
  //     error: (err) => alert('Error sending notification: ' + err.message)
  //   });
    
  // }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onSubmit() {
  //   if (this.selectedFile) {
  //     this.productService.uploadImage(this.product, this.selectedFile)
  //       .subscribe(res => {
  //         console.log('Product added successfully', res);
  //       });
  //   }
  // }

  // removeFromCart(product: Product) {
  //   // this.cartService.removeFromCart(product);
  //   // this.cartItems = this.cartService.getItems();
  // }


  file: File | null = null;

  message: string = '';
  success: boolean = false;
  loading: boolean = false;   // 👈 NEW
previewUrl: string | ArrayBuffer | null = null;
 products: any[] = [];
  newProduct: any = { name: '', description: '', price: null, imageUrl: '' };
  selectedFile: File | null = null;
showAddForm = false; 

editMode: boolean = false;   // to track if we're editing
editingProductId: number | null = null; // store product id while editing

   constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

   loadProducts() {
    this.productService.getAllProducts().subscribe(res => this.products = res);
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    // Preview before upload
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }
}


toggleAddForm() {
  this.showAddForm = !this.showAddForm;
}

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

editProduct(product: any) {
  this.showAddForm = true;
  this.editMode = true;
  this.editingProductId = product.id;

  // Pre-fill form fields
  this.newProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl
  };
  this.previewUrl = product.imageUrl;  // show existing image
  this.selectedFile = null; // reset file input
}

// Save new or updated product
async saveProduct() {
  this.loading = true;
  this.message = '';

  try {
    let imageUrl: string | null = this.newProduct.imageUrl;

    // if user selected a new file, upload to S3
    if (this.selectedFile) {
      const { uploadUrl, objectUrl } = await this.productService.getUploadUrl(
        this.selectedFile.name,
        this.selectedFile.type
      );
      await this.productService.uploadFileToS3(uploadUrl, this.selectedFile);
      imageUrl = objectUrl;
    }

    const productData = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      imageUrl: imageUrl
    };

    if (this.editMode && this.editingProductId) {
      // ✅ Update product
      await this.productService.updateProduct(this.editingProductId, productData);
      this.message = '✅ Product updated successfully';
    } else {
      // ✅ Add new product
      await this.productService.createProduct(productData);
      this.message = '✅ Product added successfully';
    }

    this.success = true;
    this.loadProducts();   // refresh list
    this.showAddForm = false; // close form
    this.clearForm();      // reset

  } catch (err: any) {
    this.success = false;
    this.message = '❌ Error: ' + err.message;
  } finally {
    this.loading = false;
  }
}

  clearForm() {
    this.newProduct.name = '';
    this.newProduct.description = '';
    this.newProduct.price = null;
    this.file = null;
  }

}



