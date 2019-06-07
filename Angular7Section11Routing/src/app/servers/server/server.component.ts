import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id']; //esse + converte string pra numero
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']); //+ converte string pra number
    //   }
    // );

    //approach above was replaced by this one bellow 
    //it gets currrent server by using route ServerResolver (specially important when using async data) instead of approach above
    this.route.data.subscribe((data: Data)=>{this.server = data['server']}); //matchs the name we use at route config
  }

  onEdit() {
    //since we´re already inside the above path, it´s not required to use a complete navigate params
    //this.router.navigate(['/servers', this.server.id, 'edit']);

     ///this navigate loose'allowEdit' query param
     //this.router.navigate(['edit'], { relativeTo: this.route});

    ///queryParamsHandling:"preserve" make sure you dont loose 'allowEdit' you had before
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });//'merge' });
  }
}
