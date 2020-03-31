import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  listFilter: string = 'cart';
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @ViewChild('filterElement') filterElementRef: ElementRef;


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
