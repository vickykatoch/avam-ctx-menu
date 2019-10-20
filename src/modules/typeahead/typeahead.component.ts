import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';

export type QueryFn<T> = (searchText: string) => T[];
export type trackByFn<T> = (index: number, item: T) => string | number | Date;

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styles: [
    `
      :host {
        position: relative;
      }
      .result {
        background: #3a3f44;
        border-bottom: 1px solid #000;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        padding: 3px 5px;
        position: absolute;
        left: 0;
        right: 0;
        overflow-y: auto;
      }
      .item {
        cursor: pointer;
      }
      .item:hover {
        background: #272b30;
      }
      .item.selected {
        background: #272b30;
      }
    `
  ]
})
export class TypeaheadComponent implements OnInit, OnDestroy {
  //#region FIELDS
  searchText$ = new Subject<string>();
  @ViewChild('searchInput') searchInput: ElementRef;
  private disposed$ = new Subject<boolean>();
  searchResult: any[] = [];
  selectedItem: any;
  private currentIndex = -1;
  //#endregion

  //#region CTOS
  constructor() {
    this.rowId = this.getRowId;
  }
  //#endregion

  //#region EXTERNAL INPUT/OUTPUT
  @Input() query: QueryFn<T>;
  @Input() height: number;
  @Output() searchItemSelected = new EventEmitter<any>();
  @Input() itemTemplate: TemplateRef<any>;
  @Input() rowId: trackByFn;
  //#endregion

  //#region NG LIFE-CYCLE
  ngOnInit() {
    this.searchText$
      .pipe(
        takeUntil(this.disposed$),
        debounceTime(100),
        distinctUntilChanged(),
        filter(() => this.query !== undefined || this.query !== null)
      )
      .subscribe(
        (text: any) => (this.searchResult = this.query(text)),
        this.onError.bind(this),
        () => console.log('Typeahead destroyed')
      );
  }
  ngOnDestroy(): void {
    this.reset();
    this.disposed$.next(true);
  }
  //#endregion

  //#region GUI CALLBACKS
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.keyCode) {
      case 27:
        this.reset();
        break;
      case 40: // Down
        if (
          this.searchResult &&
          this.searchResult.length &&
          this.currentIndex < this.searchResult.length - 1
        ) {
          this.currentIndex++;
          this.selectedItem = this.searchResult[this.currentIndex];
        }
        break;
      case 38: // up
        if (this.searchResult && this.searchResult.length && this.currentIndex > 0) {
          this.currentIndex--;
          this.selectedItem = this.searchResult[this.currentIndex];
        }
        break;
      case 13:
        if (this.selectedItem) {
          this.searchItemSelected.next(this.selectedItem);
          this.reset();
          this.searchInput.nativeElement.blur();
        }
        break;
    }
  }
  onSelect(item: any) {
    this.searchItemSelected.next(item);
    this.reset();
  }
  getRowId(index: number, item: any): string {
    return item;
  }
  //#endregion

  //#region HELPER METHODS
  private onError(err: any) {
    console.error(err);
  }
  private reset() {
    this.searchResult = [];
    this.currentIndex = -1;
    this.selectedItem = null;
    this.searchInput.nativeElement.value = '';
  }
  //#endregion
}
