import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate (component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot ) : Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

export interface CanComponentDeactivate {
  canDeactivate: () =>Observable<boolean> | Promise<boolean> | boolean;
}