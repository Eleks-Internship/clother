import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  form: FormGroup;

  @Output() send = new EventEmitter<{ lastName: string, firstName: string, email: string, password: string }>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lastName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, []]
    }, { validators: this.checkPassword });
  }

  private checkPassword(group: FormGroup): boolean | { notSame: boolean } {
    const password: string = group.get('password').value;
    const confirmPass: string = group.get('confirmPassword').value;

    return password === confirmPass ? null : { notSame: true };
  }

  sendForm(info: { lastName: string, firstName: string, email: string, password: string, confirmPassword?: string }): void {
    delete info.confirmPassword;
    this.send.emit(info);
  }

  redirect(): void {
    this.router.navigate(['login']);
  }
}
