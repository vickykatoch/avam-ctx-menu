import { Component, OnInit } from '@angular/core';
import { FxPreferencesService } from './services/fx-preferences.service';
import { Observable } from 'rxjs';
import { ICcyCategory } from 'fx';

@Component({
  selector: 'fx-host',
  templateUrl: './fx-host.component.html',
  host: {
    class: 'd-flex flex-grow-1 flex-column'
  }
})
export class FxHostComponent implements OnInit {
  ccyCategories$: Observable<ICcyCategory[]>;

  constructor(private prefsService: FxPreferencesService) { }

  ngOnInit() {
    this.ccyCategories$ = this.prefsService.getCategories();
  }

}
