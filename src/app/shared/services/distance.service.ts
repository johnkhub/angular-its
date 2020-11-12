import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Planet} from 'src/app/shared/models/planet';

const URL_API = 'http://localhost:8080/interstellar/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor(private http:HttpClient) { }

  calcMinimumDistance(from:string,to:string): Observable<any> {
    return this.http.get(URL_API + 'mindist/'+to);
  }

  findMinimumPath(from:string,to:string): Observable<any> {
    return this.http.get(URL_API + 'minpath/'+to);
  }

  getPlanets(): Observable<Planet>{
    return this.http.get<Planet>(URL_API + 'planets');
  }
}
