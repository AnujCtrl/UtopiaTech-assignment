import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  private map!: L.Map;

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [39.8282, -98.5795],
    //   zoom: 3,
    // });
        this.map = L.map('map').setView(
      [this.lat,this.lng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    L.marker([this.lat, this.lng])
      .addTo(this.map)
      .bindPopup('Panel Location');
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
