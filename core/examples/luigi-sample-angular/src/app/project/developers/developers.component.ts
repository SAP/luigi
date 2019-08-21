import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  removeContextUpdateListener,
  removeInitListener
} from '@kyma-project/luigi-client';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {
  private initListener;
  private updateListener;
  private visitors = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  updateVisitors() {
    let visitors = window['visitors'] || 0;
    window['visitors'] = ++visitors;
    return visitors;
  }

  ngOnInit() {
    this.initListener = addInitListener((context, origin) => {
      this.visitors = this.updateVisitors();
      console.log('visitorsInit ', this.visitors);
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    removeContextUpdateListener(this.updateListener);
    removeInitListener(this.initListener);
  }
}
