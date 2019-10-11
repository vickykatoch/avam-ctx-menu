import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICcyCategory } from '../models/model';

@Component({
  selector: 'fx-ccy-categories-bar',
  templateUrl: './ccy-categories-bar.component.html'
})
export class CcyCategoriesBarComponent implements OnInit {
  private ccyCategories: ICcyCategory[] = [];

  @Input() set categories(value: ICcyCategory[]) {
    if(Array.isArray(value) && value.length) {
      this.ccyCategories = value;
      this.activeCategory = value[0];
    } else {
      this.ccyCategories = [];
      this.activeCategory = undefined;
    }
  }
  get categories(): ICcyCategory[] {
    return this.ccyCategories;
  }
  @Output() activeCategoryChanged = new EventEmitter<ICcyCategory>();
  activeCategory: ICcyCategory;

  constructor() { }

  ngOnInit() {
  }
  selectCategory(category: ICcyCategory) {
    this.activeCategory = category;
    this.activeCategoryChanged.next(category);
  }
}
