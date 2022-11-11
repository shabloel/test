import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },
  //we can add parameters to our path like so. The colon tells Angular that this is the dynamic part of the path.
  //the part oafter the ":" can be anything. for example /users/something would load a single user.
  //we can nest routes to avoid code duplication, we have to add another <router-outlet> though in the child template.
  //in other words, <router-outlet> in the servers template can only render paths 'servers' that trigger ServersComponent
  //not its child elements, so paths servers/id triggering ServerComponent.
  { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ] 
  },
  { path: 'not-found' , component: PageNotFoundComponent},
  //    ** means, catch all paths you dont know
  // your routes get parsed from top to bottom, so when it can't find a match, it'll re-direct to not-found
  { path: '**' , redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
