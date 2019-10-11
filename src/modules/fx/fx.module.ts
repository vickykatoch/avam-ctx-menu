import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcyCategoriesBarComponent } from './ccy-bar/ccy-categories-bar.component';
import { CcyTradeComponent } from './ccy-trade/ccy-trade.component';


@NgModule({
    imports : [
        CommonModule
    ], declarations: [
        CcyCategoriesBarComponent,
        CcyTradeComponent
    ],
    exports: [
        CcyCategoriesBarComponent,
        CcyTradeComponent
    ]
})
export class FxModule {
}
