import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {
    products: any[] = [];

    constructor(
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.getProductsByCategory('purses')
    }

    async getProductsByCategory (name: string){
        await this.categoryService.findProductsByCategory(name).subscribe((data:any) => {
            console.log(data);
            this.products = data.data;
          });
    }
}  