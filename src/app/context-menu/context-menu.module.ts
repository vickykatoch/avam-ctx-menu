import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextMenuDirective } from './context-menu.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuItemDirective } from './directives/context-menu-item.directive';
import { ContextMenuItemComponent } from './components/context-menu-item/context-menu-item.component';

@NgModule({
  declarations: [ContextMenuDirective, ContextMenuComponent, ContextMenuItemDirective, ContextMenuItemComponent],
  imports: [
    CommonModule,
    OverlayModule
  ]
})
export class ContextMenuModule { }
