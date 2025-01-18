import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvinceService } from 'src/app/services/province.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provinces-list',
  templateUrl: './provinces-list.component.html',
  styleUrls: ['./provinces-list.component.scss']
})
export class ProvincesListComponent {
  provinces: any[] = [];
  constructor(
    private provinceService: ProvinceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.provinceService.findAll().subscribe((data: any) => {
      console.log(data);
      this.provinces = data.data;
    });
  }
}