import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {Home} from './home/home';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FancyImageUploaderModule} from 'ng2-fancy-image-uploader';

@NgModule({
  declarations: [AppComponent, Home],
  imports     : [BrowserModule, FormsModule, HttpModule, FancyImageUploaderModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
