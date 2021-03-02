import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clothes } from 'src/app/interface/clothes';

@Component({
  selector: 'app-clothes-form',
  templateUrl: './clothes-form.component.html',
  styleUrls: ['./clothes-form.component.scss']
})
export class ClothesFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  image: any;

  @Input() clothes: Clothes | undefined;

  @Output() send = new EventEmitter<{ name: string, image: any, urlForBuy: string } | FormData>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.clothes) {
      this.form = this.formBuilder.group({
        name: [this.clothes.name ?? null, [Validators.required]],
        image: [null, [Validators.required]],
        urlForBuy: [this.clothes.urlForBuy ?? null],
      });
    } else {
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        image: [null, [Validators.required]],
        urlForBuy: [null],
      });
    }
    
  }

  ngOnChanges(): void {
    this.form = this.formBuilder.group({
      name: [this.clothes.name ?? null, [Validators.required]],
      image: [null, [Validators.required]],
      urlForBuy: [this.clothes.urlForBuy ?? null],
    });
  }

  updateImage(event: any): void {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  sendForm(info: { name: string, image: any, urlForBuy: string }): void {
    const formData: FormData = new FormData();
    if (this.clothes) {
      formData.append('id', this.clothes._id);
    }
    formData.append('name', info.name);
    formData.append('image', this.image);
    formData.append('urlForBuy', info.urlForBuy);

    this.send.emit(formData);
  }

}
