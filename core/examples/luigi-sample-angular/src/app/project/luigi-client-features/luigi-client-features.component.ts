import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';
import { slugify } from '../../services/helpers';

@Component({
  selector: 'app-luigi-client-features',
  templateUrl: './luigi-client-features.component.html',
  styleUrls: ['./luigi-client-features.component.scss']
})
export class LuigiClientFeaturesComponent implements OnInit {
  public modalActive = false;
  public newCsValue = 'Cool New Env';
  public csRefreshed = false;
  private loadingInstance;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  public toggleModal() {
    this.modalActive = !this.modalActive;
  }

  public clearContextSwitcher() {
    sessionStorage.removeItem('contextSwitcherExtraOptions');
    this.refreshContextSwitcher();
  }

  public addToContextSwitcher() {
    // get currently stored values
    let newValues = [{ label: this.newCsValue, id: slugify(this.newCsValue) }];

    const existingValues = sessionStorage.getItem(
      'contextSwitcherExtraOptions'
    );
    if (existingValues) {
      newValues = newValues.concat(JSON.parse(existingValues));
    }

    sessionStorage.setItem(
      'contextSwitcherExtraOptions',
      JSON.stringify(newValues)
    );
    this.refreshContextSwitcher();
  }

  private refreshContextSwitcher() {
    this.csRefreshed = false;
    LuigiClient.uxManager().refreshContextSwitcher();
    setTimeout(() => {
      this.csRefreshed = true;
      this.cdr.detectChanges();
    }, 500);
  }

  public triggerLoadingIndicatorDemo() {
    clearTimeout(this.loadingInstance);
    LuigiClient.uxManager().showLoadingIndicator();
    this.loadingInstance = setTimeout(() => {
      LuigiClient.uxManager().hideLoadingIndicator();
    }, 3000);
  }
}
