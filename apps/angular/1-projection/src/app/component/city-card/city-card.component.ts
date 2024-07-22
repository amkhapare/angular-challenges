import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities" [template]="listItem" (add)="add()">
      <img cardImage src="assets/img/city.png" width="200px" />
    </app-card>
    <ng-template #listItem let-item>
      <app-list-item [name]="item.name" (delete)="delete(item)" />
    </ng-template>
  `,
  styles: [
    ``, //Need to style without using ngDeep
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  add(): void {
    this.store.addOne(randomCity());
  }

  delete(item: City): void {
    this.store.deleteOne(item.id);
  }
}
