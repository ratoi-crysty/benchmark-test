import './cell.scss';
import { FC, memo } from 'react';
import bem from 'easy-bem';
import { CellModel } from '@benchmark-test/stream';
import { useCell } from '../../stores/stream.store';

export interface CellProps {
  id: number;
}

const b = bem('Cell');

export const Cell: FC<CellProps> = memo(function Cell({ id }: CellProps) {
  const cell: CellModel | undefined = useCell(id);

  if (!cell) {
    return null;
  }

  return <div className={b()}>{cell?.value}</div>;
});
