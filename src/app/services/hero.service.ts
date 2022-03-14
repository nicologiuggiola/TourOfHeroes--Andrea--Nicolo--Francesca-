import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HeroesComponent } from '../components/heroes/heroes.component';
import { Hero } from '../model/hero';
// import { HEROES } from '../model/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly API_URL =
    'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private messageS: MessageService, private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    // const heroesObservable = of(HEROES);
    // //this.messageS.add("Viva abbiamo caricato gli eori!")
    // return heroesObservable;
    return this.http.get<Hero[]>(this.API_URL).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError((error) => this.handleError<Hero[]>(error, []))
    );
    // return this.http.get<Hero[]>(this.API_URL + this.HEROES_GET);
  }

  getHero(heroId: string): Observable<Hero> {
    // const hero = HEROES.find(hero => hero.id === heroId);
    // return of(hero);

    return this.http.get<Hero>(this.API_URL + '/' + heroId).pipe(
      tap((_) => this.log(`fetched hero id=${heroId}`)),
      catchError((error) => this.handleError<Hero>(error, {}))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.API_URL + '/' + hero.id, hero, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated hero id=${hero.id}`)),
        catchError((error) => this.handleError<Hero>(error, {}))
      );
  }

  addHero(hero: Hero) {
    return this.http.post<Hero>(this.API_URL, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError((error) => this.handleError<Hero>(error, {}))
    );
  }

  deleteHero(id: string) {
    return this.http
      .delete<Hero>(this.API_URL + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => this.log(`deleted hero id=${id}`)),
        catchError((error) => this.handleError<Hero>(error, {}))
      );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    name = name.trim();
    return this.http.get<Hero[]>(this.API_URL + '?name=' + name).pipe(
      tap((result) =>
        result.length
          ? this.log(`found heroes matching "${name}"`)
          : this.log(`no heroes matching "${name}"`)
      ),
      catchError((error) => this.handleError<Hero[]>(error, []))
    );
  }

  handleError<PIPPO>(error: any, res?: any): Observable<PIPPO> {
    console.log(error);
    return of(res as PIPPO);
  }

  // getData(){
  //   return this.http.get<Hero[]>("./assets/data.json");
  // }

  private log(message: string) {
    this.messageS.add(`HeroService: ${message}`);
  }
}
