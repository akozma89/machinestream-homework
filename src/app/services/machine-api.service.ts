import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MachinesResponse } from '../interfaces/machines-response';
import { MachineResponse } from '../interfaces/machine-response';

@Injectable({
    providedIn: 'root',
})
export class MachineApiService {
    baseUrl = `${environment.apiUrl}/machines`;

    constructor(private http: HttpClient) {}

    getMachines(): Observable<MachinesResponse> {
        return this.http.get<MachinesResponse>(this.baseUrl);
    }

    getMachine(id: string): Observable<MachineResponse> {
        return this.http.get<MachineResponse>(`${this.baseUrl}/${id}`);
    }
}
