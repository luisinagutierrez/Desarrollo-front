import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { SurchargelistComponent } from '../surchargelist/surchargelist.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule
      ],
      declarations: [ 
        NavbarComponent,
        CartComponent,
        SurchargelistComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Component Initialization
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Title
  it('should have title "Coco Purse"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Coco Purse');
  });

  // Test 3: Categories Button
  it('should show categories button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[mat-button]');
    expect(button?.textContent).toContain('Categorías');
  });
});