//import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { LoggingService } from '../services/logging.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers: [LoggingService]
})
export class NewAccountComponent {
  //@Output() accountAdded = new EventEmitter<{name: string, status: string}>();
  constructor(private logginService: LoggingService, 
    private accountsService: AccountService) {
      this.accountsService.statusUpdated.subscribe(
        (status: string) => alert('New Status:' + status)
      );
    }

  onCreateAccount(accountName: string, accountStatus: string) {
   /* this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });*/
    //Angular provides a much better way to use Services rather than instantiating them like here!
    //const service = new LoggingService();
    this.accountsService.addAccount(accountName, accountStatus);
    // this.logginService.logStatusChange(accountStatus);
  }
}
