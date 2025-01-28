import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  product: {
    name: string;
    data?: {
      name: string;
    };
  };
  productId?: {
    name: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal?: number;
}

interface Order {
  id: number;
  status: string;
  orderDate: Date;
  updatedDate: Date;
  total: number;
  orderItems: OrderItem[];
  user?: any;
  displayNumber?: number;
}

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  startDate: string = '';
  endDate: string = '';
  selectedStatus: string = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

loadOrders() {
  const user = this.authService.getLoggedUser();
  if (!user?.email) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Sesión no iniciada'
    });
    return;
  }

  this.orderService.getOrdersByEmail(user.email).subscribe({
    next: (response: any) => {
      console.log('Raw order data:', response.data);
      
      const orderPromises = response.data.map((order: any, index: number) => {
        const productPromises = order.orderItems.map((item: any) => {
          console.log('Product ID being fetched:', item.productId);
          return this.productService.findOne(item.productId).toPromise()
            .then(product => {
              console.log('Product fetched:', product);
              return product;
            });
        });

        return Promise.all(productPromises).then(products => {
          return {
            ...order,
            displayNumber: index + 1,
            orderItems: order.orderItems.map((item: any, idx: number) => ({
              ...item,
              product: products[idx]?.data || products[idx], // Handle both data wrapper and direct product
              subtotal: item.quantity * item.unitPrice
            }))
          };
        });
      });

      Promise.all(orderPromises).then(processedOrders => {
        console.log('Final processed orders:', processedOrders);
        this.orders = processedOrders;
        this.filteredOrders = [...this.orders];
        this.applyFilters();
      });
    },
    error: (error) => {
      console.error('Error loading orders:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las órdenes'
      });
    }
  });
}

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFilters();
  }

  onDateChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.orders];

    if (this.selectedStatus) {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate + 'T00:00:00');
      const end = new Date(this.endDate + 'T23:59:59.999');

      start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
      end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= start && orderDate <= end;
      });
    }

    this.filteredOrders = filtered;
  }
}