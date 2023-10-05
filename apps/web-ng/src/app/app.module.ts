import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RowComponent } from './components/row/row.component';
import { StreamComponent } from './components/stream/stream.component';
import { ColComponent } from './components/col/col.component';
import { CellComponent } from './components/cell/cell.component';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { RxLet } from '@rx-angular/template/let';
import { RxIf } from '@rx-angular/template/if';
import { RxFor } from '@rx-angular/template/for';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    StreamComponent,
    ColComponent,
    CellComponent,
  ],
  imports: [BrowserModule, RxLet, RxIf, RxFor],
  providers: [{
    provide: RX_RENDER_STRATEGIES_CONFIG,
    useValue: {
      parent: false, // this applies to all RxLets
    },
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
