import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  linkManager,
  setTargetOrigin
} from '@luigi-project/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    addInitListener(initialContext => {
      this.message = 'Luigi Client initialized.';
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
    addContextUpdateListener(updatedContext => {
      this.message = 'Luigi Client updated.';
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
  }

  openModal() {
    linkManager().openAsModal('sample1');
    // linkManager().openAsModal('/sample1');
    setTargetOrigin('http://localhost:4200');
  }

}
