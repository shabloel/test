import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
   // this.errorMessage = this.route.snapshot.data['message'];
    //alternative, in case you want to use this data, and it can possibly change while on this component
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
}
