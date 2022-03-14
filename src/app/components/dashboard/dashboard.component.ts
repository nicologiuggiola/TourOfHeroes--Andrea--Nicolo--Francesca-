import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroS: HeroService) { }

  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes() {
    this.heroS.getHeroes().subscribe(
      data => this.heroes = data.slice(0, 4)
    )
  }

}
