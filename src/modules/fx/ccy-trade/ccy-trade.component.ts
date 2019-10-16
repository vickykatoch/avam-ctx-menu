import { Component, OnInit, Input } from '@angular/core';
import { Instrument, IMarketData, IPriceLevel } from '../models/model';
import PriceTransformer, { ITransformedPriceLevel, TransformedPrice } from './price-transformer';

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
  private instr: Instrument;
  topPrice: ITransformedPriceLevel;
  marketDepth: ITransformedPriceLevel[] = [];
  private mktData: IMarketData;

  constructor() {}

  @Input() set instrument(value: Instrument) {
    if (value) {
      this.instr = value;
      this.ccyPair = this.adapt(value);
    } else {
      this.ccyPair = undefined;
      this.instr = value;
    }
  }
  @Input() set marketData(value: IMarketData) {
    if (value && value !== this.mktData) {
      this.topPrice = PriceTransformer.transform(value.priceLevels[0], +this.instr.tickSize);    
      this.marketDepth = value.priceLevels
        .filter(x => x.level > 0)
        .map(pLevel => PriceTransformer.transform(pLevel, +this.instr.tickSize));
      this.mktData = value;
    }
  }

  ngOnInit() {}

  getRowId(index: number, pLevel: IPriceLevel) {
    return pLevel.level;
  }
  private adapt(instrument: Instrument): ICcyPair {
    this.instr = instrument;
    const ccySplit = instrument.alias.split('/');
    return {
      base: ccySplit[0],
      quote: ccySplit[1],
      baseImg: `assets/images/${ccySplit[0]}.png`,
      quoteImg: `assets/images/${ccySplit[1]}.png`
    };
  }
}
