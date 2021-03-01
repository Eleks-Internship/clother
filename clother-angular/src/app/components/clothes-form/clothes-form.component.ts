import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clothes-form',
  templateUrl: './clothes-form.component.html',
  styleUrls: ['./clothes-form.component.scss']
})
export class ClothesFormComponent implements OnInit {
  form: FormGroup;
  image: any;

  @Output() send = new EventEmitter<{ name: string, image: any, urlForBuy: string } | FormData>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      urlForBuy: [null],
    });
  }

  updateImage(event: any): void {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  sendForm(info: { name: string, image: any, urlForBuy: string }): void {
    const formData: FormData = new FormData();
    formData.append('name', info.name);
    formData.append('image', this.image);
    formData.append('urlForBuy', info.urlForBuy);

    this.send.emit(formData);
  }

}
