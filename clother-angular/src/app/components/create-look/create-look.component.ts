import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { HttpService } from 'src/app/service/http.service';
import { LookService } from 'src/app/service/look.service';

@Component({
  selector: 'app-create-look',
  templateUrl: './create-look.component.html',
  styleUrls: ['./create-look.component.scss']
})
export class CreateLookComponent implements OnInit {
  @Input() show: boolean;

  @Output() closed = new EventEmitter<boolean>();

  constructor(
    private httpService: HttpService,
    private lookService: LookService
  ) { }

  ngOnInit(): void {
  }

  save(info: { name: string, clothes: Clothes[] | { _id: string }[] } | FormData): void {
    this.lookService.create(info).subscribe(
      res => {
        if (res.data) {
          alert('Clothes have been uploaded success');
          this.closed.emit(false);
          window.location.reload();
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

}
