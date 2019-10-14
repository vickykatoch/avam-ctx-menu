//#region IMPORTS
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { IAugmentedCcyCategory } from '../models/model';
//#endregion

@Component({
  selector: 'fx-ccy-categories-bar',
  templateUrl: './ccy-categories-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcyCategoriesBarComponent {
  //#region PRIVATE FIELDS
  //#endregion

  //#region EXTERNAL INPUT/OUTPUT
  @Input() categories: IAugmentedCcyCategory[];
  @Input() selectedCategory: IAugmentedCcyCategory;
  @Output() categoryChanged = new EventEmitter<IAugmentedCcyCategory>();
  //#endregion

  //#region CTOR
  constructor() {}
  //#endregion

  //#region NG LIFECYCLE

  //#endregion

  //#region GUI CALLBACKS
  selectCategory(category: IAugmentedCcyCategory) {
    this.selectedCategory = category;
    this.categoryChanged.next(category);
  }
  //#endregion

  //#region HELPER METHODS
  //#endregion
}
