import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from '../models/model';

interface ICcyPair {
  base: string;
  quote: string;
  baseImg: string;
  quoteImg: string;
}

@Component({
  selector: 'fx-ccy-trade',
  templateUrl: './ccy-trade.component.html'
})
export class CcyTradeComponent implements OnInit {
  ccyPair: ICcyPair;
  private _instrument: Instrument;

  constructor() {}

  @Input() set instrument(value: Instrument) {
    if (value) {
      this.ccyPair = this.adapt(value);
    } else {
      this.ccyPair = undefined;
    }
  }

  ngOnInit() {}

  private adapt(instrument: Instrument): ICcyPair {
    this._instrument = instrument;
    const ccySplit = instrument.alias.split('/');
    return {
      base: ccySplit[0],
      quote: ccySplit[1],
      baseImg: `assets/images/${ccySplit[0]}.png`,
      quoteImg: `assets/images/${ccySplit[1]}.png`
    };
  }
}
