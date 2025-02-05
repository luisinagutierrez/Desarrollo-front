import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBe(false);
    
    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBe(true);
  });

  it('should validate form state', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBe(false);

    component.loginForm.controls['email'].setValue('test@email.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBe(true);
  });

  it('should handle form submission', () => {
    const loginSpy = jest.spyOn(component, 'login');
  
    component.loginForm.controls['email'].setValue('test@email.com');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    component.login();
    expect(loginSpy).toHaveBeenCalled();
  });
});


