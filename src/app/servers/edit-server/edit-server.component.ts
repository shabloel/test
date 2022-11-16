import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  isAllowed: boolean = false;
  areChangesSaved: boolean = false;
  serverId: string;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    //first approach, only loaded when the page gets loaded bij Angular.
    console.log('fragment ' + this.activatedRoute.snapshot.fragment);
    console.log('query params ' + this.activatedRoute.snapshot.queryParams);

    //second approach, load every time the url changes
    this.activatedRoute.fragment.subscribe();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.isAllowed = params['allowEdit'] === '1' ? true : false;
      this.server = this.serversService.getServer(+params['id']);
    });
    const id = +this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe route params to update the id if params change
    
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.areChangesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean>{
    //if you weren't allowed anyways of course you can leave this route
    if (!this.isAllowed) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && 
        !this.areChangesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
