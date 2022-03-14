import { Component } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {


  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  heroes?: Hero[];

  model: Hero = {
    id: '',
    name: '',
    power: '',
    alterEgo: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = {id: '42', name: '', power: '', alterEgo: ''};
  }

  constructor(private heroS: HeroService) { }

  add(name: string, alterEgo: string, power: string){
    name = name.trim()
    if(name){
      const hero = {name: name, power: power, alterEgo: alterEgo} as Hero
      this.heroS.addHero(hero).subscribe(data => {
        console.log(data);
        if (this.heroes) {
          this.heroes.push(data);
        } 
      });
    }
  }
}
