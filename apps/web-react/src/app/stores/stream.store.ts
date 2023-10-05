import { create, StoreApi, UseBoundStore } from 'zustand';
import { CellModel, ColModel, ImmutableStream, RowModel, StreamData } from '@benchmark-test/stream';
import { useCallback } from 'react';

export interface StreamStoreActions {
  init: () => void;
  start: () => void;
  stop: () => void;
  clear: () => void;
}

export interface StreamStoreState {
  data: StreamData;
  actions: StreamStoreActions;
}

export const useStreamStore: UseBoundStore<StoreApi<StreamStoreState>> = create<StreamStoreState>(
  (setState, getState): StreamStoreState => {
    const stream = new ImmutableStream({
      rows: 100,
      cols: 5,
      cells: 3,
      batchSize: 50,
      interval: 100,
    });

    const updateData = (data: StreamData) => setState({ data });
    let unsubscribe: (() => void) | undefined;

    return {
      data: stream.getData(),
      actions: {
        init: () => {
          unsubscribe = stream.listen(updateData);
        },
        start: () => {
          stream.start();
        },
        stop: () => {
          stream.stop();
        },
        clear: () => {
          getState().actions.stop();
          unsubscribe?.();
        },
      },
    };
  }
);

function listSelector({ data }: StreamStoreState): number[] {
  return data.list;
}

function actionsSelector({ actions }: StreamStoreState): StreamStoreActions {
  return actions;
}

export function useStreamList(): number[] {
  return useStreamStore(listSelector);
}

export function useStreamActions(): StreamStoreActions {
  return useStreamStore(actionsSelector);
}

export function useRow(id: number): RowModel | undefined {
  return useStreamStore(useCallback((state) => state.data.sets.rows[id], [id]));
}

export function useCol(id: number): ColModel | undefined {
  return useStreamStore(useCallback((state) => state.data.sets.cols[id], [id]));
}

export function useCell(id: number): CellModel | undefined {
  return useStreamStore(useCallback((state) => state.data.sets.cells[id], [id]));
}
