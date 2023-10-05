import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CellModel, ColModel, ImmutableStream, RowModel, StreamData } from '@benchmark-test/stream';
import { RxState } from '@rx-angular/state';
import { selectSlice } from '@rx-angular/state/selections';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  protected readonly stream = new ImmutableStream({
    rows: 100,
    cols: 5,
    cells: 3,
    batchSize: 50,
    interval: 100,
  });
  protected readonly started = new RxState<{ value: boolean }>();
  protected readonly data = new RxState<StreamData>();
  protected unsubscribe?: () => void;

  constructor() {
    this.data.set(this.stream.getData());
    this.started.set({ value: false });
  }

  init() {
    this.unsubscribe = this.stream.listen((data) => this.data.set(data));
  }

  start() {
    this.started.set({ value: true });
    this.stream.start();
  }

  stop() {
    this.started.set({ value: false });
    this.stream.stop();
  }

  clear() {
    this.stop();
    this.unsubscribe?.();
  }

  getStarted(): Observable<boolean> {
    return this.started.select('value');
  }

  updateCell(id: number) {
    this.stream.updateCell(id);
  }

  getStartedValue(): boolean {
    return this.started.get('value');
  }

  getList(): Observable<number[]> {
    return this.data.select('list');
  }

  getRow(id: number): Observable<RowModel | undefined> {
    return this.data.select(selectSlice(['sets']), map(({ sets }) => sets.rows[id]));
  }

  getCol(id: number): Observable<ColModel | undefined> {
    return this.data.select(selectSlice(['sets']), map(({ sets }) => sets.cols[id]));

  }

  getCell(id: number): Observable<CellModel | undefined> {
    return this.data.select(selectSlice(['sets']), map(({ sets }) => sets.cells[id]));
  }
}
