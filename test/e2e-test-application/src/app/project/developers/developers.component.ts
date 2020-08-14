import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  addInitListener,
  removeInitListener,
  getActiveFeatureToggles
} from '@luigi-project/client';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {
  private initListener;
  private visitors = 0;
  private testFeatureToggleActive = false;

  constructor(private cdr: ChangeDetectorRef) {}

  updateVisitors() {
    let visitors = window['visitors'] || 0;
    window['visitors'] = ++visitors;
    return visitors;
  }

  ngOnInit() {
    this.initListener = addInitListener((context, origin) => {
      this.visitors = this.updateVisitors();
      let featureToggleList = getActiveFeatureToggles();
      if (featureToggleList.includes('test')) {
        this.testFeatureToggleActive = true;
      }
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    removeInitListener(this.initListener);
  }
}
