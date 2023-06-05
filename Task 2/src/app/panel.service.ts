import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private apiUrl = 'https://uat.utopiatech.in:4520/panel/gettestlist';

  constructor(private http: HttpClient) {}

  getPanelList(orgId: number): Observable<any> {
    const params = { org_id: orgId.toString() };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
