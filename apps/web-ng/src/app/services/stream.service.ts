import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { CellModel, ColModel, ImmutableStream, RowModel, StreamData } from '@benchmark-test/stream';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  protected readonly stream = new ImmutableStream({
    rows: 100,
    cols: 5,
    cells: 3,
    batchSize: 1,
    interval: 2000,
  });
  protected unsubscribe?: () => void;
  protected started$ = new BehaviorSubject(false);

  protected readonly data$ = new BehaviorSubject<StreamData>(this.stream.getData());

  init() {
    this.unsubscribe = this.stream.listen((data) => this.data$.next(data));
  }

  start() {
    this.started$.next(true);
    this.stream.start();
  }

  stop() {
    this.started$.next(false);
    this.stream.stop();
  }

  clear() {
    this.stream.stop();
    this.unsubscribe?.();
  }

  getStarted(): Observable<boolean> {
    return this.started$.asObservable();
  }

  updateCell(id: number) {
    this.stream.updateCell(id);
  }

  getStartedValue(): boolean {
    return this.started$.getValue();
  }

  getList(): Observable<number[]> {
    return this.data$.asObservable().pipe(
      map(({ list }) => list),
      distinctUntilChanged(),
      tap(() => {
        console.log('*******************List changed!');
      })
    );
  }

  getRow(id: number): Observable<RowModel | undefined> {
    return this.data$.asObservable().pipe(
      map(({ sets }): RowModel => sets.rows[id]),
      distinctUntilChanged(),
      tap(() => {
        console.log(`================Row ${id} changed!`);
      })
    );
  }

  getCol(id: number): Observable<ColModel | undefined> {
    return this.data$.asObservable().pipe(
      map(({ sets }): ColModel => sets.cols[id]),
      distinctUntilChanged(),
      tap(() => {
        console.log(`-------------Col ${id} changed!`);
      })
    );
  }

  getCell(id: number): Observable<CellModel | undefined> {
    return this.data$.asObservable().pipe(
      map(({ sets }): CellModel => sets.cells[id]),
      distinctUntilChanged(),
      tap(() => {
        console.log(`+++++++++++++++++Cell ${id} changed!`);
      })
    );
  }
}
