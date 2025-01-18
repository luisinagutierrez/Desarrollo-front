import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincesListComponent } from './provinces-list.component';

describe('ProvincesListComponent', () => {
  let component: ProvincesListComponent;
  let fixture: ComponentFixture<ProvincesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvincesListComponent]
    });
    fixture = TestBed.createComponent(ProvincesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
