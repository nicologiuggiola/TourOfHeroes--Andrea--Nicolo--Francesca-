import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';
// import { HEROES } from 'src/app/model/mock-heroes';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes?: Hero[];

  selectedHero?: Hero;

  model :Hero = {id: '18', name: 'Dr. IQ', power: 'Invisible', alterEgo: 'Chuck Overstreet'};

  submitted = false;

  onSubmit() { this.submitted = true; }
  
  constructor(private heroS: HeroService, private messageS: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageS.add("l'utente ha selezionato l'eroe: " + this.selectedHero.name);
  }

  getHeroes(): void{
    this.heroS.getHeroes().subscribe({next: data => this.heroes = data, error: err => console.log(err)});
  }

  add(name: string){
    name = name.trim()
    if(name){
      const hero = {name: name} as Hero
      this.heroS.addHero(hero).subscribe(data => {
        console.log(data);
        if (this.heroes) {
          this.heroes.push(data);
        } 
      });
    }
  }

  delete(hero: Hero){
    if (this.heroes) {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroS.deleteHero(hero.id).subscribe(data => console.log(data));
    }
    
  }

}
