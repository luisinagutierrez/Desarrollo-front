import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorySelectionService {
  private selectedCategory = new Subject<string>();

  categorySelected$ = this.selectedCategory.asObservable();

  selectCategory(category: string) {
    this.selectedCategory.next(category);
    console.log("category in service: ", category);
  }
}
