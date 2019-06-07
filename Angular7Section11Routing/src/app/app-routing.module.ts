import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

//canActivate: [AuthGuardService] means servers route is only accesible if method AuthGuard.canActivate returns true, which only happens if authService.isAuthenticated returns true;
//canActivateChild: [AuthGuardService] now handles acces try outs to child routes only
//canDeactivate: [CanDeactivateGuardService] makes Angular runs this guard whenever we try to leave the route
const appRoutes : Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] }, 
  // { path: 'servers', canActivate: [AuthGuardService],  component: ServersComponent, children: [
  { path: 'servers', canActivateChild: [AuthGuardService],  component: ServersComponent, children: [
    { path: ':id', component: ServerComponent, resolve: {server:ServerResolverService} },  //resolve takes a different property from other guards
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] }, 
  ] },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found man!'} }, //passing static data to a route
  { path: '**', redirectTo: '/not-found' } //** means catch all paths you dont know. It has to be the last route setup
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes) //RouterModules special method registering our routes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
