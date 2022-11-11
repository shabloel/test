import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    //add the + to convert to a number
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    //allternative
    this.activatedRoute.params.subscribe(
      (params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
      }
    )
  }

  public editServer(){
    //since we are already on the path, we can simply append.
    //preserve makes sure the queryParameter we currently have gets passed on to the child.
    //if we have any new ones, preserve will overwrite them, so in that case we have to choose merge.
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
    //alternative
    //this.router.navigate(['/servers', this.server.id, 'edit']);
  }
}
