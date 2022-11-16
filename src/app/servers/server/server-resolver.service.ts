import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
//resolve is a generic type and you should add here any datatype you want to fetch in the end.
export class ServerResolverService implements Resolve<Server>
{
  constructor(private serverService: ServersService) { }
  
  //this will load our data in advance
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
    return this.serverService.getServer(+route.params['id']);
  }
}
