import { Component } from '@angular/core';

@Component({
  selector: 'fx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'd-flex flex-grow-1'
  }
})
export class AppComponent {
  title = 'avam-ctx-menu';
}
