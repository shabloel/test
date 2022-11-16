import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolverService } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  //we can add parameters to our path like so. The colon tells Angular that this is the dynamic part of the path.
  //the part oafter the ":" can be anything. for example /users/something would load a single user.
  //we can nest routes to avoid code duplication, we have to add another <router-outlet> though in the child template.
  //in other words, <router-outlet> in the servers template can only render paths 'servers' that trigger ServersComponent
  //not its child elements, so paths servers/id triggering ServerComponent.
  //canActivate takes an array of all guards for that particular path you want to protect. It will be applied to all the child routes.
  //canActivatechild speaks for itself.
  {
    path: 'servers',
          //canActivate: [AuthGuardService],
          canActivateChild: [AuthGuardService],
          component: ServersComponent,
    children: [
    //resolve takes a javascript property with all the resolvers you have defined.
    // the data this resolver returns from the resolve method is stored in the object "{sever: ServerResolverService"}.
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  //passing static data to a route goes with a key value pair.
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  //    ** means, catch all paths you dont know
  // your routes get parsed from top to bottom, so when it can't find a match, it'll re-direct to not-found
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)
  ],
  //we export this routermodule so it is available in other components.
  exports: [RouterModule]
})
export class AppRoutingModule {}
