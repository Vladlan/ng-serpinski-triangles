import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, VERSION } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { interval } from 'rxjs';

declare const requestIdleCallback: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  version = VERSION.major;
  seconds = 0;
  transform: SafeStyle;
  transformText: string;
  start = new Date().getTime();
  lastTimestamp = 0;
  maxFPS = 60;
  timestep = 1000 / this.maxFPS;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer) { }

  public ngOnInit() {
    interval(1000).subscribe(() => {
      this.seconds = (this.seconds % 10) + 1;
    });

    requestIdleCallback(() => {
      requestAnimationFrame(this.main.bind(this));
    }, { timeout: 1000 });

  }

  private main(timestamp) {
    requestIdleCallback((deadline) => {
      requestAnimationFrame(this.main.bind(this));
      if ((deadline.timeRemaining() > 0 || deadline.didTimeout)) {
        this.draw();
      }
    }, { timeout: 1000 });
    if (timestamp - this.lastTimestamp < this.timestep) return;
    this.lastTimestamp = timestamp;
  }

  private draw() {
    const elapsed = new Date().getTime() - this.start;
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const scaleX = scale / 2.1;
    this.transformText = `scaleX(${scaleX}) scaleY(0.7) translateZ(0.1px)`;
    this.transform = this.sanitizer.bypassSecurityTrustStyle(this.transformText);
    this.detectChanges();
  }

  private tick() {
    this.seconds = (this.seconds % 10) + 1;
  }

  detectChanges() {
    this.cdr && this.cdr.detectChanges && this.cdr.detectChanges();
  }

}
