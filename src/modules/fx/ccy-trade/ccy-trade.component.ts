import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from '../models/model';

@Component({
  selector: 'fx-ccy-trade',
  templateUrl: './ccy-trade.component.html',
  host: {
    class: 'd-flex'
  }
})
export class CcyTradeComponent implements OnInit {

  constructor() { }

  @Input() instrument: Instrument;

  ngOnInit() {
  }

}
