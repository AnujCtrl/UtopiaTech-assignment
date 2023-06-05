import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrls: ['./map-sidebar.component.css'],
})
export class MapSidebarComponent {
  @Input() panel: any;
}
