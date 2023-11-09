import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProveedorComponent } from './alta-proveedor.component';

describe('AltaProveedorComponent', () => {
  let component: AltaProveedorComponent;
  let fixture: ComponentFixture<AltaProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaProveedorComponent]
    });
    fixture = TestBed.createComponent(AltaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
