import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarEventService {

  private categoryButtonClickSource = new Subject<string>();  
  categoryButtonClick$ = this.categoryButtonClickSource.asObservable(); 

  emitCategoryButtonClick(name: string){
    this.categoryButtonClickSource.next(name);
    console.log("category in service: ", name);
  }
}
