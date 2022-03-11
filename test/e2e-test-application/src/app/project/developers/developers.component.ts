import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { addInitListener, removeInitListener, linkManager } from '@luigi-project/client';
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

  async checkPath() {
    let promiseA = linkManager().pathExists('/home2/test2');
    let promiseB = linkManager().pathExists('/home2/tes');
    // promiseA.then(val => console.log('vala', val));
    // promiseB.then(val => console.log('valb', val));
    console.log('a', await promiseA);
    console.log('b', await promiseB);
  }

  ngOnDestroy() {
    removeInitListener(this.initListener);
  }
}
