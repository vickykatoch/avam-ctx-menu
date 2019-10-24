import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FxPreferencesService } from './services/fx-preferences.service';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  ICcyCategory,
  IMarketData,
  IAugmentedCcyCategory,
  InstrumentMarketData,
  Instrument
} from 'fx';
import { FxMarketDataService } from './services/fx-market-data.service';
import { QueryFn } from 'typeahead';

const MODULE_NAME = 'FX-HOST';

@Component({
  selector: 'fx-host',
  templateUrl: './fx-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-flex flex-grow-1 flex-column'
  }
})
export class FxHostComponent implements OnInit, OnDestroy {
  ccyCategories$: Observable<IAugmentedCcyCategory[]>;
  activeCategory?: IAugmentedCcyCategory;
  marketData$: Observable<IMarketData>;
  private _fontSize = 16;

  constructor(
    private prefsService: FxPreferencesService,
    private marketDataService: FxMarketDataService
  ) {}

  ngOnInit() {
    this.ccyCategories$ = this.prefsService.getCategories().pipe(
      filter(categories => Array.isArray(categories) && categories.length > 0),
      map(categories => this.mapCcyCategoryToAugmentedCategory(categories)),
      tap(categories => {
        if (this.activeCategory) {
          const category = categories.find(c => c.name === this.activeCategory.name);
          this.activeCategory = category;
        }
        this.activeCategory = this.activeCategory || categories[0];
      })
    );
  }
  ngOnDestroy() {
    this.marketDataService.unsubscribe(MODULE_NAME);
  }
  getWidgetId(index: number, ins: InstrumentMarketData) {
    return ins.instrument.alias;
  }
  private mapCcyCategoryToAugmentedCategory(categories: ICcyCategory[]): IAugmentedCcyCategory[] {
    return categories.map(category => ({
      name: category.name,
      instrumentsWithMktData: category.instruments.map(instrument => ({
        instrument,
        marketData$: this.marketDataService.subscribe(MODULE_NAME, instrument).pipe(
          filter(mktData => mktData && instrument.alias in mktData),
          map(mktData => mktData[instrument.alias])
        )
      }))
    }));
  }
  onSearch(text: string): Instrument[] {
    return text
      ? this.marketDataService.data.filter(x => x.alias.toLowerCase().indexOf(text) >= 0)
      : [];
  }
  onItemSelected(instrument: Instrument) {
    console.log(instrument);
  }
  getInstrumentId(index: number, instrument: Instrument): string {
    return instrument.alias;
  }
  get fontSize(): number {
    return this._fontSize;
  }
  set fontSize(value: number) {
    // debugger;
    this._fontSize = value;
    document.documentElement.style.setProperty('--font-size', `${value}px`);
  }
}
