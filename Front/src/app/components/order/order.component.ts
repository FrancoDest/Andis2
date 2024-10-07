import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  products: { name: string, quantity: number, price: number }[] = [{ name: '', quantity: 1, price: 0 }];
  address = { street: '', city: '', zip: '' };
  orderMessage: string | null = null;
  serviceErrorMessage: string | null = null;

  // Lista de productos disponibles (puede provenir de un servicio backend)
  availableProducts = [
    { id: 1, name: 'Sopa de lechuga', price: 30 },
    { id: 2, name: 'Sopa de boniatos', price: 20 },
    { id: 3, name: 'Sopa de frutilla', price: 30 },
    { id: 4, name: 'Sopa de mondongo', price: 40 }
  ];

  constructor(private orderService: OrderService) { }

  // Agregar producto
  addProduct() {
    this.products.push({ name: '', quantity: 1, price: 0 });
  }

  // Remover producto
  removeProduct(index: number) {
    this.products.splice(index, 1);
  }

  // Al seleccionar un producto, actualiza el precio
  updateProductPrice(productIndex: number) {
    const selectedProduct = this.availableProducts.find(p => p.name === this.products[productIndex].name);
    if (selectedProduct) {
      this.products[productIndex].price = selectedProduct.price;
    }
  }

  // Enviar pedido
  onSubmit() {
    if (this.products.length === 0) {
      this.orderMessage = 'Debe agregar al menos un producto';
      return;
    }  
    const orderDetails = {
      products: this.products,
      address: this.address
    };
  
    this.orderService.completeOrder(orderDetails).subscribe(
      (response) => {
        this.orderMessage = 'Pedido completado correctamente';
        this.serviceErrorMessage = null;  // Limpiar errores previos
      },
      (error) => {
        this.orderMessage = null;
        this.serviceErrorMessage = 'Error al completar el pedido: ' + error.message;
      }
    );
  }
}