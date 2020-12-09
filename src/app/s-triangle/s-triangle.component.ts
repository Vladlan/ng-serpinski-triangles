import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit } from '@angular/core';
declare const requestIdleCallback: any;

@Component({
  selector: 'app-s-triangle',
  templateUrl: './s-triangle.component.html',
  styleUrls: ['./s-triangle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class STriangleComponent implements OnChanges {

  static slowDown = true;

  @Input() x: number;
  @Input() y: number;
  @Input() s: number;
  @Input() text: string;
  
  constructor(private cdr: ChangeDetectorRef) {
  }

  targetSize = 25;
  halfTargetSize = this.targetSize / 2;
  halfS: number;
  half2S: number;

  get isFinal() {
    return this.s <= this.targetSize;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('s' in changes) {
      this.halfS = this.s / 2;
      this.half2S = this.halfS / 2;
    }
  }

}
