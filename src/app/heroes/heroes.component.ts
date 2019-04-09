import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes';
import{HeroService} from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
 selectedHero: Hero;

 getHeroes():void{
   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
   ;
 }

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero): void{
    this.selectedHero=hero;
  }

delete(hero:Hero):void{
  this.heroes=this.heroes.filter(h=>h!==hero);
  this.heroService.deleteHero(hero).subscribe();
  //Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes.
  //There's really nothing for the component to do with the Observable returned by heroService.delete(). It must subscribe anyway.
  //If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does 
  //nothing until something subscribes!
}

  add(name:string):void{
    name=name.trim();
    if(!name)
      return;
    this.heroService.addHero({name} as Hero).subscribe(hero=>{
      this.heroes.push(hero);
      //subscribe callback receives the new hero and pushes it into to the heroes list for display.
    });
  }
}