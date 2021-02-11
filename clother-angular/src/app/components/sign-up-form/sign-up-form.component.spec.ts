import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ SignUpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('work input of lastName', () => {
    const lastName = component.form.get('lastName');

    let errors = lastName.errors || {};
    expect(errors.required).toBeTruthy();

    errors = lastName.errors || {};
    expect(errors.required).toBeTruthy();
    expect(errors.pattern).toBeFalsy();
  });

  it('work input of firstName', () => {
    const firstName = component.form.get('firstName');

    let errors = firstName.errors || {};
    expect(errors.required).toBeTruthy();

    errors = firstName.errors || {};
    expect(errors.required).toBeTruthy();
    expect(errors.pattern).toBeFalsy();
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
    expect(errors.minlength).toBeTruthy();

    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.minlength).toBeFalsy();
  });

  it('work input of confirmPassword', () => {
    const confirmPassword = component.form.get('confirmPassword');

    let errors = confirmPassword.errors || {};
    expect(errors.required).toBeFalsy();

    confirmPassword.setValue('123456');
    errors = confirmPassword.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.minlength).toBeFalsy();

    confirmPassword.setValue('123456789');
    errors = confirmPassword.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.minlength).toBeFalsy();
  });
});
