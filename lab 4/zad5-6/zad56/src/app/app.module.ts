import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Zad5Component } from './zad5/zad5.component';
import { Zad6InfoCardsComponent } from './zad6-info-cards/zad6-info-cards.component';
import { Zad6ParentComponent } from './zad6-parent/zad6-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    Zad5Component,
    Zad6InfoCardsComponent,
    Zad6ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
