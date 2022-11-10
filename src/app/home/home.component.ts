import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //we can also inject a router. This comes in handy when you have to execute some business logic, and afterwards you want
  //to navigate to a different page.

  constructor(private router: Router) {}

  ngOnInit() {}

  public onLoadServers(id: number) {
    
    //business logic

    //and then
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
}
