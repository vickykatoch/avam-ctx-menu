//#region IMPORTS
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ICcyCategory } from '../models/model';
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
  @Input() categories: ICcyCategory[];
  @Input() selectedCategory: ICcyCategory;
  @Output() categoryChanged = new EventEmitter<ICcyCategory>();
  //#endregion

  //#region CTOR
  constructor() {}
  //#endregion

  //#region NG LIFECYCLE

  //#endregion

  //#region GUI CALLBACKS
  selectCategory(category: ICcyCategory) {
    this.selectedCategory = category;
    this.categoryChanged.next(category);
  }
  //#endregion

  //#region HELPER METHODS
  //#endregion

  // private ccyCategories: ICcyCategory[] = [];
  // @Input() set categories(value: ICcyCategory[]) {
  //   if(Array.isArray(value) && value.length) {
  //     this.ccyCategories = value;
  //     this.activeCategory = value[0];
  //   } else {
  //     this.ccyCategories = [];
  //     this.activeCategory = undefined;
  //   }
  // }
  // get categories(): ICcyCategory[] {
  //   return this.ccyCategories;
  // }
  // @Output() activeCategoryChanged = new EventEmitter<ICcyCategory>();
  // activeCategory: ICcyCategory;
  // constructor() { }
  // ngOnInit() {
  // }
  // selectCategory(category: ICcyCategory) {
  //   this.activeCategory = category;
  //   this.activeCategoryChanged.next(category);
  // }
}
