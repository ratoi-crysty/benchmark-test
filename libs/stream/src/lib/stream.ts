import { StreamData, StreamPatch } from './stream.types';
import { ColModel, RowModel } from './stream.models';

export interface StreamOptions {
  readonly rows: number;
  readonly cols: number;
  readonly cells: number;
  readonly interval: number;
  readonly batchSize: number;
}

interface Indexes {
  row: number;
  col: number;
  cell: number;
}

export abstract class Stream {
  protected indexes: Indexes;
  protected data: StreamData;
  protected readonly listeners = new Set<(data: StreamData, patches: StreamPatch[]) => void>();
  protected intervalId?: number;

  constructor(protected readonly options: StreamOptions) {
    this.indexes = {
      row: 0,
      col: 0,
      cell: 0,
    };

    this.data = this.buildNewData();
  }

  start() {
    this.intervalId = +setInterval(() => {
      this.update();
    }, this.options.interval);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  getData(): StreamData {
    return this.data;
  }

  listen(cb: (data: StreamData, patches: StreamPatch[]) => void): () => void {
    this.listeners.add(cb);

    return () => this.listeners.delete(cb);
  }

  updateCell(id: number) {
    const patches: StreamPatch[] = [{ cell: id, value: this.getCellValue() }];
    this.handleUpdate(patches);
  }

  protected buildNewData(): StreamData {
    const data: StreamData = {
      list: [],
      sets: {
        rows: {},
        cols: {},
        cells: {},
      },
    };

    for (let i = 0; i < this.options.rows; i++) {
      const rowId: number = this.getId('row');

      const row: RowModel = {
        id: rowId,
        name: `Row ${rowId}`,
        cols: [],
      };

      data.list.push(rowId);
      data.sets.rows[rowId] = row;

      for (let j = 0; j < this.options.cols; j++) {
        const colId: number = this.getId('col');

        const col: ColModel = {
          id: colId,
          name: `Col ${rowId} - ${colId}`,
          cells: [],
        };

        data.sets.cols[colId] = col;
        row.cols.push(colId);

        for (let k = 0; k < this.options.cols; k++) {
          const cellId: number = this.getId('cell');

          data.sets.cells[cellId] = {
            id: cellId,
            name: `Col ${rowId} - ${cellId}`,
            value: this.getCellValue(),
          };
          col.cells.push(cellId);
        }
      }
    }

    return data;
  }

  protected update() {
    const cellsCount: number = Object.keys(this.data.sets.cells).length;
    const patches: StreamPatch[] = [];
    for (let i = 0; i < this.options.batchSize; i++) {
      patches.push({
        cell: this.getRandomFromRange(1, cellsCount),
        value: this.getCellValue(),
      });
    }

    this.handleUpdate(patches);
  }

  protected handleUpdate(patches: StreamPatch[]) {
    this.applyPatch(patches);
    this.dispatchEvent(patches);
  }

  protected dispatchEvent(patches: StreamPatch[]) {
    this.listeners.forEach((listener: (data: StreamData, patches: StreamPatch[]) => void) => {
      listener(this.data, patches);
    });
  }

  protected abstract applyPatch(patches: StreamPatch[]): void;

  protected getId(type: keyof Indexes): number {
    return ++this.indexes[type];
  }

  protected getCellValue(): number {
    return Math.floor(Math.random() * 1000) / 100;
  }

  protected getRandomFromRange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
