import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  //to access the parameter we will have to use ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name: this.activatedRoute.snapshot.params['name'],
    };
    //imagine you have a button on this page (sse html) that routes to this page. The button won't work, as Angular won't re-load the page
    //as we are already on there.
    //therefore this.activatedRoute.snapshot.params won't work.
    //therefore we can use below, which is an observable. So this function only fires when the parameters in the url change.
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  //this.activatedRoute.params.subscribe creates an observable in memory. Theoretically, this has to be destroyed as it lives on 
  //after you leave to component to another page. Angular does this for you, but you can also do it explicitly,
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
