import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PanelListComponent } from './panel-list.component';
import { PanelDetailsComponent } from './panel-details.component';
import { MapSidebarComponent } from './map-sidebar.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelListComponent,
    PanelDetailsComponent,
    MapSidebarComponent,
    MapComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
