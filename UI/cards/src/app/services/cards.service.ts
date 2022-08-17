import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  baseUrl = 'https://localhost:7184/api/cards'

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Card[]>{
    return this.http.get<Card[]>(this.baseUrl);
  }
}
