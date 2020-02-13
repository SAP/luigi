import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  addInitListener,
  removeInitListener
} from '@kyma-project/luigi-client';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {
  private initListener;
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
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    removeInitListener(this.initListener);
  }
}
