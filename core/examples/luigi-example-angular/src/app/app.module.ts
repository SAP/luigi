import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { Sample1Component } from './sample1/sample1.component';
import { Sample2Component } from './sample2/sample2.component';
import { LuigiAngularSupportModule } from '@luigi-project/client-support-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Sample1Component,
    Sample2Component
  ],
  imports: [BrowserModule, AppRoutingModule, LuigiAngularSupportModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
