import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log('fragment:' + this.route.snapshot.fragment);
    //o autor falou q o Angular resolve os unsubscribes abaixo
    //mas parece blefe. Porém, nao consegui fazer o Unsubsribe na mao, e nao sei porque.
    //apresentou erro na hora de fz o unsubscribe
    this.route.queryParams.subscribe( (queryParams: Params) => { this.allowEdit=queryParams['allowEdit']==='1'?true:false});
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    //fazer um subscribe no route params para atualizar o id se os params mudarem
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /*interface implementation*/
  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
        return confirm('Do you want to discard the changes?');
    }
    else
    { 
      return true;
    }
  }

}
