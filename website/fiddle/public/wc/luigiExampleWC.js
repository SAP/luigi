import "./f_selectbox.js";
import "./f_busy.js";
import "./f_input.js";

const template = document.createElement('template');
template.innerHTML = `
      <style>
        .fd-page{
          padding: 20px;
        }
      </style>

      <main class="fd-page">
        <header>
            <div class="fd-container">
               <div class="fd-row">
                <div class="fd-col">
                  <div class="docs-layout-grid-bg docs-layout-grid-bg--color-1">
                    <h3>Example of web component using Luigi Client</h3>
                  </div>
                </div>
              </div>
            </div>
        </header>
        
        <div class="fd-page__content" role="region" style="padding-top:20px;">
            <div class="fd-container">
              <div class="fd-row">
                <div class="fd-col">
                      <div>Please Select Alert type</div>
                      <div style="padding-top:5px;">
                        <div style="width: 200px;">
                          <fundamental-list-box id="alertBox" placeholder="Select Alert Type" default_option="" option1="info" option2="success" option3="warning" option4="error" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <br />
          
          <div class="fd-page__content" role="region" style="padding-top:20px;">
            <div class="fd-container">
              <div class="fd-row">
                <div class="fd-col">
                      <div>Confirmation Modal</div>
                      <div style="padding-top:5px;">
                        <div style="width: 200px;">
                         <div class="fddocs-container">
                                <button class="fd-button fd-button--ghost" id="bConModal" style="width:150px;">Open Modal</button>
                            </div>
                        </div>
                      </div>
                </div>
              </div>
          </div>
          <br />
          
         <div class="fd-page__content" role="region" style="padding-top:20px;">
            <div class="fd-container">
              <div class="fd-row">
                <div class="fd-col">
                      <div>Hide/show loading</div>
                      <div style="padding-top:5px;">
                       <div class="fddocs-container" style="float: left;">
                            <button class="fd-button" id="bHideBusy" style="width: 150px;">Hide</button>
                            <button class="fd-button fd-button--emphasized" id="bShowBusy" style="width: 150px;">Show</button>
                        </div>
                        <div style="width: 100px;float: left;padding-top: 10px;">
                          <fundamental-busy id="busyIndicatorExample" show="false"/></div>
                        </div>
                      </div>
                </div>
            </div>
          </div>
          <br />
        
       <div class="fd-page__content" role="region" style="padding-top:10px;">
            <div class="fd-container">
              <div class="fd-row">
                <div class="fd-col">
                      <div>Dialog Box, Split, Drawer and Navigation</div>
                      <div style="width:100%;float: left;">
                          <div style="padding-top:5px;">
                            <div style="float: left;padding-top: 10px;">
                              <fundamental-input id="dialogUrl" defaultValue="/home/table" 
                              label="Insert url to be displayed" width="250px" labelWidth="160px"/>
                            </div>
                            <div class="fddocs-container" style="float: left; padding-left:10px;padding-top: 8px;">
                                <button class="fd-button fd-button--positive" id="bOpenDialog" style="width:150px;">Open Dialog</button>
                            </div>
                          </div>
                      </div>
                      <div style="width:100%;float: left;">
                          <div style="padding-top:5px;">
                            <div style="float: left;padding-top: 10px;">
                              <fundamental-input id="splitUrl" defaultValue="/home/wc1" 
                              label="Insert url to be displayed" width="250px" labelWidth="160px"/>
                            </div>
                            <div class="fddocs-container" style="float: left; padding-left:10px;padding-top: 8px;">
                                <button class="fd-button fd-button--positive" id="bSplitDialog" style="width:150px;">Open Split</button>
                            </div>
                          </div>
                      </div>
                      <div style="width:100%;float: left;">
                          <div style="padding-top:5px;">
                            <div style="float: left;padding-top: 10px;">
                              <fundamental-input id="drawerUrl" defaultValue="/home/tree" 
                              label="Insert url to be displayed" width="250px" labelWidth="160px"/>
                            </div>
                            <div class="fddocs-container" style="float: left; padding-left:10px;padding-top: 8px;">
                                <button class="fd-button fd-button--positive" id="bDrawer" style="width:150px;">Open Drawer</button>
                            </div>
                          </div>
                      </div>
                      
                      <div style="width:100%;float: left;">
                          <div style="padding-top:5px;">
                            <div style="float: left;padding-top: 10px;">
                              <fundamental-input id="navigationUrl" defaultValue="/home/empty" 
                              label="Insert url to go" width="250px" labelWidth="160px"/>
                            </div>
                            <div class="fddocs-container" style="float: left; padding-left:10px;padding-top: 8px;">
                                <button class="fd-button fd-button--positive" id="bNavigation" style="width:150px;">Navigate</button>
                            </div>
                          </div>
                      </div>
                </div>
              </div>
            </div>
            <br />
        </div>
        <footer>
        </footer>
`;

import EcEvent from "./wcEvent.js";

export default class luigiExampleWC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addClickButtonBusy();
    this.addConfirmationModal();

    this.addClickNavButton('#bOpenDialog', 'dialogUrl', url =>{
      this.LuigiClient.linkManager().openAsModal(url, {title:'Example Dialog', size:'l'});
    });
    this.addClickNavButton('#bSplitDialog', 'splitUrl', url =>{
      this.LuigiClient.linkManager().openAsSplitView(url, {title:'Example Dialog', size:'40'});
    });
    this.addClickNavButton('#bNavigation', 'navigationUrl', url =>{
      Luigi.navigation().navigate(url);
    });
    this.addClickNavButton('#bDrawer', 'drawerUrl', url =>{
      this.LuigiClient.linkManager().openAsDrawer(url, {header:true, backdrop:true, size:'s'});
    });

    EcEvent.removeAllListeners();
    EcEvent.register("alertBox",  this.showAlert.bind(this));
    EcEvent.register("dialogUrl",  event => this.dialogUrl = event.detail);
    EcEvent.register("splitUrl",  event => this.splitUrl = event.detail);
    EcEvent.register("drawerUrl",  event => this.drawerUrl = event.detail);
    EcEvent.register("navigationUrl",  event => this.navigationUrl = event.detail);
  }

  addConfirmationModal(){
    const button = this.shadowRoot.querySelector('#bConModal');
    button.addEventListener('click', (event) => {
      this.LuigiClient.uxManager().showConfirmationModal({
        header: "Confirmation",
        body: "Are you sure you want to do this?",
        buttonConfirm: "Yes",
        buttonDismiss: "No"
      });
      event.stopPropagation();
    });
  }

  addClickNavButton(selector, valueToCheck, clickFn){
    const button = this.shadowRoot.querySelector(selector);
    button.addEventListener('click', (event) => {
      if (!this[valueToCheck] || this[valueToCheck].length === 0){
        this.LuigiClient.uxManager().showAlert({
          text: 'Please insert an ulr in the input element',
          type: 'error'
        });
        return;
      }

      clickFn(this[valueToCheck]);
      event.stopPropagation();
    }, false);
  }

  addClickButtonBusy(){
    this.bHideBusy = this.shadowRoot.querySelector('#bHideBusy');
    this.bShowBusy = this.shadowRoot.querySelector('#bShowBusy');
    this.bShowBusy.style.display = 'none';
    this.bHideBusy.addEventListener('click', (event) => {
      this.toggleBusy('busyIndicatorExample', false);
      event.stopPropagation();
    }, false);
    this.bShowBusy.addEventListener('click', (event) => {
      this.toggleBusy('busyIndicatorExample', true);
      event.stopPropagation();
    }, false);
  }

  showAlert(event){
    let alertType = event.detail;
    if (this.LuigiClient) {
      this.LuigiClient.uxManager().showAlert({
        text: 'Hello from uxManager in Web Component',
        type: alertType
      });
    }
    event.stopPropagation();
  }

  toggleBusy(id, show){
    EcEvent.fire(id, show);
    const showButtonStyle = show ? 'none' : 'block';
    const hideButtonStyle = show ? 'block' : 'none';

    this.bShowBusy.style.display = showButtonStyle;
    this.bHideBusy.style.display = hideButtonStyle;
    this.showBusy = show;
  }
}

