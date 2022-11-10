import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  public onReload() {
    //unlike the "routerLink", the navigate method does not know which route we are currently on
    //so, in the second argument we have to tell Angular where we actually are at the moment.
    this.router.navigate(['/servers'], {relativeTo: this.activatedRoute});
  }
}
