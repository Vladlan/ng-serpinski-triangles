import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { STriangleComponent } from './s-triangle/s-triangle.component';
import { DotComponent } from './dot/dot.component';
@NgModule({
  declarations: [
    AppComponent, STriangleComponent, DotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
