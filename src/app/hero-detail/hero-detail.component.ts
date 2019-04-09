import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService) { }
//The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
//Route parameters are always strings. The JavaScript (+) operator converts the string to a number
    getHero():void{
    const id=+this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);

    }
    save():void{
      this.heroService.updateHero(this.hero).subscribe(()=>this.goBack());
    }
    goBack(): void {
      this.location.back();
    }

  ngOnInit() {
    this.getHero();
  }

}