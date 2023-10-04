import './col.scss';
import { FC, memo } from 'react';
import bem from 'easy-bem';
import { ColModel } from '@benchmark-test/stream';
import { useCol } from '../../stores/stream.store';
import { Cell } from '../cell/cell';

export interface ColProps {
  id: number;
}

const b = bem('Col');

export const Col: FC<ColProps> = memo(function Col({ id }: ColProps) {
  const col: ColModel | undefined = useCol(id);

  if (!col) {
    return null;
  }

  return (
    <div className={b()}>
      <div className={b('Name')}>{col.name}</div>
      <div className={b('Cells')}>
        {col.cells.map((id) => (
          <Cell key={id} id={id} />
        ))}
      </div>
    </div>
  );
});
