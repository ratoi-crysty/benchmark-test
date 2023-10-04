import { CellModel, ColModel, RowModel } from './stream.models';

export interface StreamData {
  list: number[];

  sets: {
    rows: Record<number, RowModel>;
    cols: Record<number, ColModel>;
    cells: Record<number, CellModel>;
  };
}

export interface StreamPatch {
  cell: number;
  value: number;
}
