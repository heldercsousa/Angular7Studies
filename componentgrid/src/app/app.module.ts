import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { GridListComponent } from './grid/grid-list/grid-list.component';
import { GridListItemComponent } from './grid/grid-list/grid-list-item/grid-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridListComponent,
    GridListItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
