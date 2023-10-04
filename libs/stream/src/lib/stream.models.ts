export interface RowModel {
  id: number;
  name: string;
  cols: number[];
}

export interface ColModel {
  id: number;
  name: string;
  cells: number[];
}

export interface CellModel {
  id: number;
  name: string;
  value: number;
}
