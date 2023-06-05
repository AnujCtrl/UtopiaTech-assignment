import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { PanelService } from './panel.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit, AfterViewInit {
  panelList: any[] = [];
  selectedPanelStatus: any;

  constructor(
    private panelService: PanelService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.fetchPanelList();
  }

  ngAfterViewInit(): void {}

  fetchPanelList(): void {
    const orgId = 3;
    this.panelService.getPanelList(orgId).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.panelList = response.result;
        }
      },
      (error) => {
        console.error('Error fetching panel list:', error);
      }
    );
  }

  selectedPanel: any = null;

  openSidebar(panel: any) {
    console.log(panel);
    this.selectedPanelStatus = panel;
  }

  openMapPanel(panel: any) {
    this.selectedPanel = panel;
  }

  closeSidebar() {
    this.selectedPanel = null;
    this.selectedPanelStatus = null;
  }
}
