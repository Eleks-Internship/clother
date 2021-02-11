import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('work input of email', () => {
    const email = component.form.get('email');

    let errors = email.errors || {};
    expect(errors.required).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
  });

  it('work input of password', () => {
    const password = component.form.get('password');

    let errors = password.errors || {};
    expect(errors.required).toBeTruthy();

    password.setValue('123456');
    errors = password.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.minlength).toBeFalsy();

    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.minlength).toBeFalsy();
  });
});
