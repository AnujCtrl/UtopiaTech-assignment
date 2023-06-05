import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel-details',
  templateUrl: './panel-details.component.html',
  styleUrls: ['./panel-details.component.css'],
})
export class PanelDetailsComponent {
  @Input() panel: any;
}
