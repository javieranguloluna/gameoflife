import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Array2dComponent } from './array2d/array2d.component';
import { HashComponent } from './hash/hash.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    Array2dComponent,
    HashComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
