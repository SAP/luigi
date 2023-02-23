import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { addInitListener, removeInitListener } from '@luigi-project/client';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {
  private initListener;
  visitors = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initListener = addInitListener((context, origin) => {
      let tempVisitors = window['visitors'] || 0;
      window['visitors'] = tempVisitors + 1;
      this.visitors = window['visitors'];
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    removeInitListener(this.initListener);
  }
}
