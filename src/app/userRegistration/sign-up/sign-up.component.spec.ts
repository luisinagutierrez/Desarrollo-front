import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';
import { ProvinceService } from '../../services/province.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,HttpClientTestingModule,RouterTestingModule],
      declarations: [ SignUpComponent ],
      providers: [ 
        UserService, CityService, ProvinceService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password format', () => {
    expect(component.validatePassword('weak')).toBeFalsy();
    expect(component.validatePassword('StrongPass1!')).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTruthy();
  });

  it('should load provinces on init', () => {
    const provinceService = TestBed.inject(ProvinceService);
    const spy = jest.spyOn(provinceService, 'findAll');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});

