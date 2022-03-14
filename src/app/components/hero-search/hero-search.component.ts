import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes: Hero[] = []
  heroes$!: Observable<Hero[]>;

  timeOut: any;

  private searchTerms = new Subject<string>();


  constructor(private heroS: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroS.searchHeroes(term)),
    );
  }

  searchOLD(name: string): void{

    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }

    this.timeOut = setTimeout(() => {
      this.heroS.searchHeroes(name).subscribe(data => this.heroes = data);
    }, 300);

    
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
