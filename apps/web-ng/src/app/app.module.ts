import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RowComponent } from './components/row/row.component';
import { StreamComponent } from './components/stream/stream.component';
import { ColComponent } from './components/col/col.component';
import { CellComponent } from './components/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    StreamComponent,
    ColComponent,
    CellComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
