import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import { Hero }           from './hero';
 
@Injectable()
export class HeroSearchService {
 
  constructor(private http: Http) {}
  private heroesUrl = 'http://localhost:5000/hero/';
 
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(this.heroesUrl + 'data/search/' + term)
               .map(response => response.json() as Hero[]);
  }
}