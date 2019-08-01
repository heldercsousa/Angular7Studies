// import { Component, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component ({
 selector: 'app-header',
 templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    
    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
           this.isAuthenticated = !!user; //trick for the following - !user ? false : true; 
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        //this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}