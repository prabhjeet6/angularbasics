import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
/*You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent,
  You do this by registering a provider. A provider is something that can create or deliver a service; in this case, 
  it instantiates the HeroService class to provide the service. 
  
  You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent,
   as you will do below. You do this by registering a provider. A provider is something that can create or deliver a service; in this
    case, it instantiates the HeroService class to provide the service.
  */
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})

export class HeroService {
  //Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. 
  //Here base is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts.

  private heroesUrl = 'api/heroes';//Url to web api

  //The messageService property must be public because you're about to bind to it in the template.
  constructor(private http: HttpClient, public messageService: MessageService) { }
  /*getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }*/

  //HttpClient.get returns the body of the response as an untyped JSON object by default.
  // Applying the optional type specifier, <Hero[]> , gives you a typed result object.
  //Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable
  // result with the RxJS map operator.
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the hero
   // this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])));
    //handleError method passed insidecatchError
  }

/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}
/** GET hero by id. Return `undefined` when id not found */
getHeroNo404<Data>(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/?id=${id}`;
  return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
}
  /** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
  /*getHeroes() : Hero[] {
  return HEROES;
  }*/
  private log(message: string) {
    this.messageService.add(`HeroService:${message}`);
  }
/** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
 
/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

searchHeroes(term:string):Observable<Hero[]>{
  if(!term.trim()){
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe( tap(_ => this.log(`found heroes matching "${term}"`)),
  catchError(this.handleError<Hero[]>('searchHeroes', []))
);
}


  /*Handle the Http Operation that failed
  Let the app continue
  @param operation-name of the operation that failed
  @param result- optional value to return as the observable result */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      this.log('${operation} failed:${error.message}');

      return of(result as T);
    }
  }
}