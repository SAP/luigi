import '../../vendor/ui5/webcomponents-fiori/Wizard.js';
import '../../vendor/ui5/webcomponents-fiori/WizardStep.js';
import '../../vendor/ui5/webcomponents-fiori/WizardTab.js';

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
      <ui5-tabcontainer class="full-width" show-overflow>
      <ui5-tab icon="table-view"selected>
      <ui5-label>
      Table example, from <a href="https://sap.github.io/ui5-webcomponents/playground/components/Table/">SAP UI5 Table</a>
      <br/>
      </ui5-label>
            <ui5-table class="demo-table" id="tbl" ui5-table="">
               <!-- Columns -->
               <ui5-table-column slot="columns-1" style="width: 12rem" ui5-table-column="" first="">
                  <span style="line-height: 1.4rem">Product</span>
               </ui5-table-column>
               <ui5-table-column slot="columns-2" min-width="800" popin-text="Supplier" ui5-table-column="">
                  <span style="line-height: 1.4rem">Supplier</span>
               </ui5-table-column>
               <ui5-table-column slot="columns-3" min-width="600" popin-text="Dimensions" demand-popin="" ui5-table-column="">
                  <span style="line-height: 1.4rem">Dimensions</span>
               </ui5-table-column>
               <ui5-table-column slot="columns-4" min-width="600" popin-text="Weight" demand-popin="" ui5-table-column="">
                  <span style="line-height: 1.4rem">Weight</span>
               </ui5-table-column>
               <ui5-table-column slot="columns-5" ui5-table-column="" last="">
                  <span style="line-height: 1.4rem">Price</span>
               </ui5-table-column>
               <ui5-table-row ui5-table-row="" slot="default-1">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Basic 15</b></span><span style="margin-top: 0.5rem">HT-1000</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Very Best Screens</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">30 x 18 x 3cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.2</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>956</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-2">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Basic 17</b></span><span style="margin-top: 0.5rem">HT-1001</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Very Best Screens</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">29 x 17 x 3.1cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.5</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>1249</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-3">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Basic 18</b></span><span style="margin-top: 0.5rem">HT-1002</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Very Best Screens</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">28 x 19 x 2.5cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.2</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>1570</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-4">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Basic 19</b></span><span style="margin-top: 0.5rem">HT-1003</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Smartcards</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">32 x 21 x 4cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.2</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>1650</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-5">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>ITelO Vault</b></span><span style="margin-top: 0.5rem">HT-1007</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Technocom</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">32 x 22 x 3cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>0.2</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>299</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-6">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Professional 15</b></span><span style="margin-top: 0.5rem">HT-1010</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Very Best Screens</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">33 x 20 x 3cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.3</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>1999</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-7">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Notebook Professional 17</b></span><span style="margin-top: 0.5rem">HT-1011</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Very Best Screens</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">33 x 23 x 2cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>4.1</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>2299</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-8">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>ITelO Vault Net</b></span><span style="margin-top: 0.5rem">HT-1020</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Technocom</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">10 x 1.8 x 17cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>0.16</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>459</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-9">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>ITelO Vault SAT</b></span><span style="margin-top: 0.5rem">HT-1021</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Technocom</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">11 x 1.7 x 18cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>0.18</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>149</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-10">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Comfort Easy</b></span><span style="margin-top: 0.5rem">HT-1022</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Technocom</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">84 x 1.5 x 14cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>0.2</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>1679</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
               <ui5-table-row ui5-table-row="" slot="default-11">
                  <ui5-table-cell ui5-table-cell="" slot="default-1" first-in-row="">
                     <div class="double-line-content"><span><b>Comfort Senior</b></span><span style="margin-top: 0.5rem">HT-1023</span></div>
                  </ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-2"><span class="middle">Technocom</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-3"><span class="middle">80 x 1.6 x 13cm</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-4"><span style="color: #2b7c2b" class="middle"><b>0.8</b>KG</span></ui5-table-cell>
                  <ui5-table-cell ui5-table-cell="" slot="default-5" last-in-row=""><span class="middle"><b>512</b>EUR</span></ui5-table-cell>
               </ui5-table-row>
            </ui5-table>

      </ui5-tab>
      <ui5-tab icon="tree" >
      <ui5-label>
      Table example, from <a href="https://sap.github.io/ui5-webcomponents/playground/components/Tree/">SAP UI5 Tree</a>
      <br/>
      </ui5-label>
         
         <ui5-tree id="myTree" class="full-width" ui5-tree="">
         <ui5-tree-item text="Tree 1" icon="paste"  ui5-tree-item="">
            <ui5-tree-item expanded="" text="Tree 1.1"  ui5-tree-item="">
            <ui5-tree-item text="Tree 1.1.1" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 1.1.2" ui5-tree-item=""></ui5-tree-item>
            </ui5-tree-item>
         </ui5-tree-item>
         <ui5-tree-item text="Tree 2" icon="copy" ui5-tree-item="">
            <ui5-tree-item text="Tree 2.1" ui5-tree-item="" expanded="">
            <ui5-tree-item text="Tree 2.1.1" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2" ui5-tree-item="">
            <ui5-tree-item text="Tree 2.1.2.1" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.2" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.3" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.5" ui5-tree-item=""></ui5-tree-item>
            </ui5-tree-item>
            </ui5-tree-item>
            <ui5-tree-item text="Tree 2.2" ui5-tree-item=""></ui5-tree-item>
         </ui5-tree-item>
         <ui5-tree-item expanded="" text="Tree 3 (no icon)" ui5-tree-item="">
         </ui5-tree-item>
      </ui5-tree>
      
      <br/>
      Here another example with multiple selection:
      <br/>
      <br/>
      
      <ui5-tree id="myTree" class="full-width" mode="MultiSelect" ui5-tree="">
         <ui5-tree-item expanded="" text="Tree 1" icon="paste" ui5-tree-item="" selected="">
         <ui5-tree-item text="Tree 1.1" ui5-tree-item="" selected="">
         <ui5-tree-item text="Tree 1.1.1" ui5-tree-item=""></ui5-tree-item>
         <ui5-tree-item text="Tree 1.1.2" ui5-tree-item=""></ui5-tree-item>
         </ui5-tree-item>
         </ui5-tree-item>
         <ui5-tree-item text="Tree 2" icon="copy" ui5-tree-item="" selected="">
         <ui5-tree-item text="Tree 2.1" ui5-tree-item="">
         <ui5-tree-item text="Tree 2.1.1" ui5-tree-item=""></ui5-tree-item>
         <ui5-tree-item text="Tree 2.1.2" ui5-tree-item="">
            <ui5-tree-item text="Tree 2.1.2.1" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.2" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.3" ui5-tree-item=""></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2.5" ui5-tree-item=""></ui5-tree-item>
         </ui5-tree-item>
         </ui5-tree-item>
         <ui5-tree-item text="Tree 2.2" ui5-tree-item=""></ui5-tree-item>
         </ui5-tree-item>

         <ui5-tree-item expanded="" text="Tree 3 (no icon)" ui5-tree-item="">
         </ui5-tree-item>
      </ui5-tree>
         
      </ui5-tab>
      <ui5-tab icon="activate" >
         <ui5-label>
         Table example, from <a href="https://sap.github.io/ui5-webcomponents/playground/components/Wizard/">SAP UI5 Wizard</a>
         <br/>
         </ui5-label>
      
         <ui5-wizard id="wiz" ui5-wizard="" width="1240">
            <ui5-wizard-step icon="product" heading="Product type" ui5-wizard-step="" slot="default-1" selected="">
            <div style="display: flex; min-height: 200px; flex-direction: column;">
               <ui5-title ui5-title="">1. Product Type</ui5-title><br>
         
               <ui5-messagestrip ui5-messagestrip="">
               The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
               </ui5-messagestrip><br>
         
               <ui5-label wrap="" ui5-label="">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
               </ui5-label>
            </div>
         
            <ui5-button id="toStep2" design="Emphasized" ui5-button="" hidden="">Step 2</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="hint" heading="Product Information" ui5-wizard-step="" slot="default-2">
            <div style="display: flex;flex-direction: column">
               <ui5-title ui5-title="">2. Product Information</ui5-title><br>
               <ui5-label wrap="" ui5-label="">
               Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
               </ui5-label>
         
               <div style="display: flex; flex-direction: column;">
               <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
               <ui5-label ui5-label="">Name</ui5-label>
               <ui5-input placeholder="product name..." ui5-input="" _input-width="210"></ui5-input>
               </div>
         
               <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
               <ui5-label ui5-label="">Weight</ui5-label>
               <ui5-input value="3.65" ui5-input="" _input-width="210"></ui5-input>
               </div>
         
               <div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
               <ui5-label ui5-label="">Manifacturer</ui5-label>
               <ui5-select ui5-select="">
                  <ui5-option ui5-option="" selected="">Apple</ui5-option>
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
         
            <ui5-button id="toStep3" design="Emphasized" ui5-button="">Step 3</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="action-settings" heading="Options" disabled="" ui5-wizard-step="" slot="default-3">
            <div style="display: flex; flex-direction: column;">
               <ui5-title ui5-title="">3. Options</ui5-title><br>
         
               <ui5-label wrap="" ui5-label="">
               Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
               </ui5-label>
               <ui5-messagestrip ui5-messagestrip="">
               The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
               </ui5-messagestrip><br>
         
               <div style="display: flex; flex-direction: column;">
               <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
               <ui5-label ui5-label="">Manifacture date</ui5-label>
               <ui5-date-picker ui5-date-picker=""></ui5-date-picker>
               </div>
         
               <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
               <ui5-label ui5-label="">Availability</ui5-label>
               <ui5-segmentedbutton id="segButton1" ui5-segmentedbutton="" style="width: 100%;">
                  <ui5-togglebutton icon="employee" ui5-togglebutton="" has-icon="" pressed="" style="width: 100%;">In stock</ui5-togglebutton>
                  <ui5-togglebutton ui5-togglebutton="" style="width: 100%;">In depot</ui5-togglebutton>
                  <ui5-togglebutton ui5-togglebutton="" style="width: 100%;">Damaged</ui5-togglebutton>
                  <ui5-togglebutton ui5-togglebutton="" style="width: 100%;">Out of stock</ui5-togglebutton>
               </ui5-segmentedbutton>
               </div>
         
               <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
               <ui5-label ui5-label="">Size</ui5-label>
               <ui5-segmentedbutton id="sb" ui5-segmentedbutton="" style="width: 100%;">
                  <ui5-togglebutton icon="employee" ui5-togglebutton="" has-icon="" pressed="" style="width: 100%;">Small</ui5-togglebutton>
                  <ui5-togglebutton ui5-togglebutton="" style="width: 100%;">Medium</ui5-togglebutton>
                  <ui5-togglebutton ui5-togglebutton="" style="width: 100%;">Large</ui5-togglebutton>
               </ui5-segmentedbutton>
               </div>
               </div>
            </div>
         
            <ui5-button id="toStep4" design="Emphasized" hidden="" ui5-button="">Step 4</ui5-button>
            </ui5-wizard-step>

            <ui5-wizard-step icon="lead" heading="Pricing" disabled="" ui5-wizard-step="" slot="default-4">
            <div style="display: flex; flex-direction: column;">
               <ui5-title ui5-title="">4. Pricing</ui5-title><br>
               <ui5-label wrap="" ui5-label="">
               Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
               </ui5-label>
               <ui5-messagestrip ui5-messagestrip="">
               The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
               </ui5-messagestrip><br>
         
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
      </ui5-wizard>
      </ui5-tab>
      </ui5-tabcontainer>
   </body>
</html>
`;

export default class Ui5exampleWC extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
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
