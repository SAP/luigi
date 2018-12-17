import { Component, OnInit } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';
import { slugify } from '../../services/helpers';

@Component({
  selector: 'app-luigi-client-features',
  templateUrl: './luigi-client-features.component.html',
  styleUrls: ['./luigi-client-features.component.scss']
})
export class LuigiClientFeaturesComponent implements OnInit {
  public newCsValue = 'Cool New Env';
  private loadingInstance;
  constructor() {}

  ngOnInit() {}

  public refreshContextSwitcher() {
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
    LuigiClient.uxManager().refreshContextSwitcher();
  }

  public triggerLoadingIndicatorDemo() {
    clearTimeout(this.loadingInstance);
    LuigiClient.uxManager().showLoadingIndicator();
    this.loadingInstance = setTimeout(() => {
      LuigiClient.uxManager().hideLoadingIndicator();
    }, 3000);
  }
}
