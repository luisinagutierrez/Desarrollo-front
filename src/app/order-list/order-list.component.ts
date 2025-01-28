import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../services/product.service';
import { CityService } from '../services/city.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  startDate: string = '';
  endDate: string = '';
  selectedStatus: string = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private cityService: CityService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadOrders();
  }

loadOrders() {
  this.orderService.findAll().subscribe({
    next: (response: any) => {
      console.log('Raw order data:', response.data);
      
      const orderPromises = response.data.map((order: any, index: number) => {
        // Promesa de productos
        const productPromises = order.orderItems.map((item: any) => {
          console.log('Product ID being fetched:', item.productId);
          return this.productService.findOne(item.productId).toPromise()
            .then(product => {
              console.log('Product fetched:', product);
              return product;
            });
        });

        // Promesa de Ciudad
        console.log('City ID being fetched:', order.user?.city);
        const cityPromise = order.user?.city ? 
          this.cityService.findOne(order.user.city).toPromise()
            .then(city => {
              console.log('City fetched:', city);
              return city;
            }) : 
          Promise.resolve(null);

        return Promise.all([...productPromises, cityPromise]).then(results => {
          const products = results.slice(0, -1);
          const city = results[results.length - 1];
          console.log('City result:', city);

          return {
            ...order,
            displayNumber: index + 1,
            user: {
              ...order.user,
              cityName: city?.data?.name || city?.name || 'N/A' // Diferentes formas
            },
            orderItems: order.orderItems.map((item: any, idx: number) => {
              const enrichedItem = {
                ...item,
                product: products[idx],
                subtotal: item.quantity * item.unitPrice
              };
              return enrichedItem;
            })
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
      // Parse dates and adjust for timezone
      const start = new Date(this.startDate + 'T00:00:00');
      const end = new Date(this.endDate + 'T23:59:59.999');

      // Add timezone offset
      start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
      end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

      console.log('Start Date:', start);
      console.log('End Date:', end);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        console.log('Order Date:', orderDate, 'for order:', order.id);
        console.log('Is within range:', orderDate >= start && orderDate <= end);
        return orderDate >= start && orderDate <= end;
      });
    }

    this.filteredOrders = filtered;
    console.log('Filtered Orders:', this.filteredOrders);
}

  edit(order:any){
    order.editStatus = order.status;
    order.editing = true;
  }

  save(order: any): void {
    if (!order.editStatus) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un estado.',
      });
      return;
    }

    if (order.status !== order.editStatus) {
      const updatedOrder = {
        ...order,
        status: order.editStatus,
        updatedDate: new Date()
      };

      this.orderService.update(updatedOrder).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire(
            'Orden actualizada con éxito!',
            '',
            'success'
          );
          order.status = order.editStatus;
          order.updatedDate = new Date();
          order.editing = false;
        },
        (err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la orden.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se realizaron cambios en la orden.',
      });
      order.editing = false;
    }
  }
}
