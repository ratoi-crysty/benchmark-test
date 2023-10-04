import { CellModel } from './stream.models';
import { Stream } from './stream';
import { StreamPatch } from './stream.types';

export class ImmutableStream extends Stream {
  protected applyPatch(patches: StreamPatch[]): void {
    console.log('Apply patch', patches);

    const newCells = patches.reduce((acc: Record<number, CellModel>, patch: StreamPatch): Record<number, CellModel> => {
      acc[patch.cell] = {
        ...this.data.sets.cells[patch.cell],
        value: patch.value,
      };

      return acc;
    }, {});

    this.data = {
      ...this.data,
      sets: {
        ...this.data.sets,
        cells: {
          ...this.data.sets.cells,
          ...newCells,
        },
      },
    };
  }
}
