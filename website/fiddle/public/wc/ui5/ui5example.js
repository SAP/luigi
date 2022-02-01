import 'https://sap.github.io/ui5-webcomponents/assets/js/ui5-webcomponents/bundle.esm.js';

const template = document.createElement('template');
template.innerHTML = `
<!DOCTYPE html>
   <html lang="EN">
   <head>
      <meta charset="utf-8">
      <title>Editable List | Web Components</title>
      <style>  
      </style>
   </head>
   <body>
        <ui5-wizard id="wiz">
            <ui5-wizard-step icon="product" title-text="Product type" selected ui5-wizard-step="" slot="default-1">
                <div style="display: flex; min-height: 200px; flex-direction: column;">
                  <ui5-title ui5-title="">1. Product Type</ui5-title><br>
        
                  <ui5-message-strip ui5-message-strip="" data-sap-ui-fastnavgroup="true">
                    The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                  </ui5-message-strip><br>
        
                  <ui5-label wrapping-type="Normal" ui5-label="">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
                  </ui5-label>
                </div>
                <ui5-button id="toStep2">Step 2</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="hint" title-text="Product Information" disabled="" ui5-wizard-step="" slot="default-2">
              <div style="display: flex;flex-direction: column">
                <ui5-title ui5-title="">2. Product Information</ui5-title><br>
                <ui5-label wrapping-type="Normal" ui5-label="">
                  Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                </ui5-label>

                <div style="display: flex; flex-direction: column;">
                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Name</ui5-label>
                    <ui5-input placeholder="product name..." ui5-input="" _input-width="0"></ui5-input>
                  </div>

                  <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                    <ui5-label ui5-label="">Weight</ui5-label>
                    <ui5-input value="3.65" ui5-input="" _input-width="0"></ui5-input>
                  </div>

                  <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                    <ui5-label ui5-label="">Manifacturer</ui5-label>
                    <ui5-select ui5-select="">
                      <ui5-option ui5-option="" selected="" _focused="">Apple</ui5-option>
                      <ui5-option ui5-option="">Samsung</ui5-option>
                      <ui5-option ui5-option="">Huawei</ui5-option>
                    </ui5-select>
                  </div>

                  <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                    <ui5-label ui5-label="">5 years guarantee included</ui5-label>
                    <ui5-switch id="sw" ui5-switch=""></ui5-switch>
                  </div>
                </div>
              </div>
              <ui5-button id="toStep3" design="Emphasized" ui5-button="" hidden="true">Step 3</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="action-settings" title-text="Options" disabled="" ui5-wizard-step="" slot="default-3">
              <div style="display: flex; flex-direction: column;">
                <ui5-title ui5-title="">3. Options</ui5-title><br>

                <ui5-label wrapping-type="Normal" ui5-label="">
                  Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                </ui5-label>
                <ui5-message-strip ui5-message-strip="" data-sap-ui-fastnavgroup="true">
                  The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                </ui5-message-strip><br>

                <div style="display: flex; flex-direction: column;">
                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Manifacture date</ui5-label>
                    <ui5-date-picker ui5-date-picker=""></ui5-date-picker>
                  </div>

                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Availability</ui5-label>
                    <ui5-segmented-button id="segButton1" ui5-segmented-button="" style="width: 100%;">
                      <ui5-toggle-button icon="employee" ui5-toggle-button="" has-icon="" pressed="" style="width: 100%;">In stock</ui5-toggle-button>
                      <ui5-toggle-button ui5-toggle-button="" style="width: 100%;">In depot</ui5-toggle-button>
                      <ui5-toggle-button ui5-toggle-button="" style="width: 100%;">Damaged</ui5-toggle-button>
                      <ui5-toggle-button ui5-toggle-button="" style="width: 100%;">Out of stock</ui5-toggle-button>
                    </ui5-segmented-button>
                  </div>

                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Size</ui5-label>
                    <ui5-segmented-button id="sb" ui5-segmented-button="" style="width: 100%;">
                      <ui5-toggle-button icon="employee" ui5-toggle-button="" has-icon="" pressed="" style="width: 100%;">Small</ui5-toggle-button>
                      <ui5-toggle-button ui5-toggle-button="" style="width: 100%;">Medium</ui5-toggle-button>
                      <ui5-toggle-button ui5-toggle-button="" style="width: 100%;">Large</ui5-toggle-button>
                    </ui5-segmented-button>
                  </div>
                </div>
              </div>

              <ui5-button id="toStep4" design="Emphasized" hidden="" ui5-button="">Step 4</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="lead" title-text="Pricing" disabled="" ui5-wizard-step="" slot="default-4">
              <div style="display: flex; flex-direction: column;">
                <ui5-title ui5-title="">4. Pricing</ui5-title><br>
                <ui5-label wrapping-type="Normal" ui5-label="">
                  Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                </ui5-label>
                <ui5-message-strip ui5-message-strip="" data-sap-ui-fastnavgroup="true">
                  The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                </ui5-message-strip><br>
      
                <div style="display: flex; flex-direction: column;">
                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Price</ui5-label>
                    <ui5-input placeholder="product price..." ui5-input="" _input-width="0"></ui5-input>
                  </div>
      
                  <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
                    <ui5-label ui5-label="">Quantity</ui5-label>
                    <ui5-input placeholder="product quantity..." ui5-input="" _input-width="0"></ui5-input>
                  </div>
      
                  <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
                    <ui5-label ui5-label="">Vat included</ui5-label>
                    <ui5-switch checked="" ui5-switch=""></ui5-switch>
                  </div>
                </div>
              </div>
              <ui5-button id="finalize" design="Emphasized" ui5-button="">Finalize</ui5-button>
            </ui5-wizard-step>
    </body>
  </html>
`;
export default class Ui5exampleWC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Code fore Wizard...
    this.setupWizard();
  }

  setupWizard() {
    const wiz = this.shadowRoot.getElementById('wiz');
    const steps = wiz.children;
    const step1 = steps[0];
    const step2 = steps[1];
    const step3 = steps[2];
    const sw = step2.querySelector('#sw');
    const sb = step3.querySelector('#sb');
    const finalize = wiz.querySelector('#finalize');

    const toStep2 = step1.querySelector('#toStep2');
    const toStep3 = step2.querySelector('#toStep3');
    const toStep4 = step3.querySelector('#toStep4');

    wiz.addEventListener('selection-change', event => {
      console.log(event.detail.selectedStep);
    });

    sw.addEventListener('change', () => {
      toStep3.removeAttribute('hidden');
    });

    sb.addEventListener('selection-change', () => {
      toStep4.removeAttribute('hidden');
    });

    toStep2.addEventListener('click', () => {
      this.deselectAll(wiz);
      this.setStep(wiz, 1);
      toStep2.setAttribute('hidden', true);
    });

    toStep3.addEventListener('click', () => {
      this.deselectAll(wiz);
      this.setStep(wiz, 2);
      toStep3.setAttribute('hidden', true);
    });

    toStep4.addEventListener('click', () => {
      this.deselectAll(wiz);
      this.setStep(wiz, 3);
      toStep4.setAttribute('hidden', true);
    });

    finalize.addEventListener('click', function() {
      alert('Finalize');
    });
  }

  deselectAll(wizard) {
    Array.from(wizard.children).forEach(function(step) {
      step.selected = false;
    });
  }

  setStep(wizard, idx) {
    const step = this.getStep(wizard, idx);
    step.selected = true;
    step.disabled = false;
  }

  getStep(wizard, idx) {
    return Array.from(wizard.children)[idx];
  }
}
