import './row.scss';
import { FC, memo } from 'react';
import bem from 'easy-bem';
import { RowModel } from '@benchmark-test/stream';
import { useRow } from '../../stores/stream.store';
import { Col } from '../col/col';

export interface RowProps {
  id: number;
}

const b = bem('Row');

export const Row: FC<RowProps> = memo(function Cell({ id }: RowProps) {
  const row: RowModel | undefined = useRow(id);

  if (!row) {
    return null;
  }

  return (
    <div className={b()}>
      <div className={b('Name')}>{row.name}</div>
      <div className={b('Cols')}>
        {row.cols.map((id) => (
          <Col key={id} id={id} />
        ))}
      </div>
    </div>
  );
});
