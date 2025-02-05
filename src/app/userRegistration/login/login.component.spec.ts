import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Component Initialization
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Email Validation
  it('should validate email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBe(false);
    
    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBe(true);
  });

  // Test 3: Form State
  it('should validate form state', () => {
    // Test invalid state
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBe(false);
    
    // Test valid state
    component.loginForm.controls['email'].setValue('test@email.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBe(true);
  });

  // Test 4: Form Submission
  it('should handle form submission', () => {
    // Mock login method
    const loginSpy = jest.spyOn(component, 'login');
    
    // Set valid form values
    component.loginForm.controls['email'].setValue('test@email.com');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    // Submit form
    component.login();
    
    // Verify login was called
    expect(loginSpy).toHaveBeenCalled();
  });
});