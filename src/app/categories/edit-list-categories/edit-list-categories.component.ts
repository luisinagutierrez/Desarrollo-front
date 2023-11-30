import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-list-categories',
  templateUrl: './edit-list-categories.component.html',
  styleUrls: ['./edit-list-categories.component.scss']
})
export class EditListCategoriesComponent {
  categories: any[] = [];
  
    constructor(
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.categoryService.findAll().subscribe((data: any) => {
      console.log(data);
      this.categories = data.data;  });
      }
  
    delete(id: string) {
      console.log(id);
      Swal.fire({
        title: 'Desea eliminar la categoría',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e7c633',
        cancelButtonColor: '#f76666',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.delete(id)
          .subscribe({
            next: res => {
              Swal.fire(
                'Confirmado',
                'La acción ha sido confirmada',
                'success'
              );
              this.router.navigate(['/AdminCategories']);
              this.categories = this.categories.filter(category => category.id !== id); // lo tuve que agregar para que se actualice la página y no quede el prodcuto que ya había eliminado hasta que se recargue 
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    }

    edit(category: any): void {
      category.editName = category.name;
      category.editDescription = category.description;
      category.editing = true;
    }
  
  
    save(category: any): void {
      console.log(category);

      category.name = category.editName;
      category.description = category.editDescription;

      console.log(category);
      this.categoryService.update(category).subscribe({
        next: res => {
          Swal.fire(
            'Confirmado',
            'Los cambios han sido guardados',
            'success'
          );
        },
        error: err => {
          console.log(err);
        }
      });
      category.editing = false;
    }
  }
  