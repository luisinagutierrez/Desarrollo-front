import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
  

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}
    
  add(addForm: NgForm) {  
    const newCategory = addForm.value;
    console.log(newCategory);
  
    this.categoryService.add(newCategory)
    .subscribe(
      (res:Response) => {
       console.log(res);
      Swal.fire(
        'Provincia agregada con éxito!!',
        '',
        'success'
        );
      },
      (err: Error) => {
      console.log(err);
            
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: err.message,
        });
      }
    );        
  }
  }
  function subscribe(arg0: (res: Response) => void, arg1: (err: Error) => void) {
  throw new Error('Function not implemented.');
  }
  
  
