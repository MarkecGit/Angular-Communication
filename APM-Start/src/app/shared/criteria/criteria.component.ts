import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { EventEmitter  } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  //listFilter: string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits :' + this.hitCount;
    }
    //console.log(changes);
  }

  ngOnInit() {
  }

}
