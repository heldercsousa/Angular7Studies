import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log('fragment:' + this.route.snapshot.fragment);
    //o autor falou q o Angular resolve os unsubscribes abaixo
    //mas parece blefe. Porém, nao consegui fazer o Unsubsribe na mao, e nao sei porque.
    //apresentou erro na hora de fz o unsubscribe
    this.route.queryParams.subscribe( (queryParams: Params) => { this.allowEdit=queryParams['allowEdit']==='1'?true:false});
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
