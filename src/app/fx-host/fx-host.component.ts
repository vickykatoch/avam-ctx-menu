import { Component, OnInit } from '@angular/core';
import { FxPreferencesService } from './services/fx-preferences.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICcyCategory, Instrument } from 'fx';

@Component({
  selector: 'fx-host',
  templateUrl: './fx-host.component.html',
  host: {
    class: 'd-flex flex-grow-1 flex-column'
  }
})
export class FxHostComponent implements OnInit {
  ccyCategories$: Observable<ICcyCategory[]>;
  activeCategory: ICcyCategory | undefined;

  constructor(private prefsService: FxPreferencesService) {}

  ngOnInit() {
    this.ccyCategories$ = this.prefsService
      .getCategories()
      .pipe(tap(categories => (this.activeCategory = categories ? categories[0] : undefined)));
  }
  getWidgetId(index: number, instrument: Instrument) {
    return instrument.alias;
  }
}
