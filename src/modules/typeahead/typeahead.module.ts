import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [TypeaheadComponent],
  exports: [TypeaheadComponent]
})
export class TypeaheadModule {}
