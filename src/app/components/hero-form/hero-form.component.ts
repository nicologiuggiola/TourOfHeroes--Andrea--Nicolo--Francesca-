import { Component } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {


  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  heroes?: Hero[];
  isNewHero = false;

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

  constructor(private heroS: HeroService, private route: ActivatedRoute,  private location: Location) { }

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.heroS.getHero(heroId).subscribe(data => {
        if (data) {
          this.isNewHero = false;
          this.model = {id: data.id, name: data.name, power: data.power, alterEgo: data.alterEgo};
        }
      })
    } else {
      this.isNewHero = true;
      this.model =  {id:"", name:"", power:"", alterEgo:""}
    }
  }

  newHero() {
    this.model = {id: '42', name: '', power: '', alterEgo: ''};
  }

  onClickUpdater(name: string, alterEgo: string, power: string){
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.save();
    } else {
      this.add(name, alterEgo, power);
    }
  }

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

  goBack(): void{
    this.location.back()
  }

  save(): void{
    if (this.model) {
      this.heroS.updateHero(this.model).subscribe(data =>{
        console.log(data);
        this.goBack();
      })
    }
  }
}
