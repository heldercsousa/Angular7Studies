import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', //selection by HTML element tag name, or angular directive 
  //selector: '[app-servers]', //selection by HTML element attribute
  //selector: '.app-servers', //selectio by HTML element class
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer=false;
  serverCreationStatus = 'No server was created';
  serverName = 'testing server name two way binding';
  serverCreated = false;
  servers = ['Testserver','Testserver 2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer=true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created!';
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
