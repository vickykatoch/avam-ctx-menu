import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMarketData, Instrument, IPriceLevel } from 'fx';

@Injectable({ providedIn: 'root' })
export class FxMarketDataService {
  private subscribedInstrumentSet = new Set<string>();
  private notifier = new Subject<Record<string, IMarketData>>();
  private obs$ = this.notifier.asObservable();
  private isStarted = true;

  subscribe(subscriber: string, instrument: Instrument): Observable<Record<string, IMarketData>> {
    !this.isStarted && this.start();
    this.subscribedInstrumentSet.add(instrument.alias);
    return this.obs$;
  }
  private start() {
    if (!this.isStarted) {
      this.isStarted = true;
      setInterval(() => {
        const data = this.generateData();
        this.notifier.next(data);
      }, 1000);
    }
  }
  private generateData(): Record<string, IMarketData> {
    const mktData: Record<string, IMarketData> = {};
    this.subscribedInstrumentSet.forEach(instrument => {
      const priceLevels: IPriceLevel[] = [];
      mktData[instrument] = {
        instrument,
        priceLevels
      };
      for (let level = 0; level < 5; level++) {
        priceLevels.push({
          level
        });
      }
    });
    return mktData;
  }
}
