import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICcyCategory } from 'fx';

const URL = 'assets/ccy-categies.json';

@Injectable({
    providedIn: 'root'
})
export class FxPreferencesService {
    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<ICcyCategory[]> {
        return this.http.get<ICcyCategory[]>(URL);
    }
}
