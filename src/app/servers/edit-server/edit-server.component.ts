import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  isAllowed: boolean = false;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //first approach, only loaded when the page gets loaded bij Angular.
    console.log('fragment ' + this.activatedRoute.snapshot.fragment);
    console.log('query params ' + this.activatedRoute.snapshot.queryParams);

    //second approach, load every time the url changes
    this.activatedRoute.fragment.subscribe();
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.isAllowed = params['allowEdit'] === '1' ? true : false;
      }
    );

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
