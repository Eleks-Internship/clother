import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';

@Component({
  selector: 'app-look-form',
  templateUrl: './look-form.component.html',
  styleUrls: ['./look-form.component.scss']
})
export class LookFormComponent implements OnInit {
  @Input() clothes: Clothes;

  constructor() { }

  ngOnInit(): void {
  }

}
