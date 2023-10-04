import './stream.scss';
import { FC, memo, useEffect } from 'react';
import bem from 'easy-bem';
import { useStreamActions, useStreamList } from '../../stores/stream.store';
import { Row } from '../row/row';

const b = bem('Stream');

export const Stream: FC = memo(function Stream() {
  const list: number[] = useStreamList();
  const { start, stop } = useStreamActions();

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, [start, stop]);

  return (
    <div className={b()}>
      <div>Stream component</div>
      <div className={b('Rows')}>
        {list.map((id: number) => (
          <Row key={id} id={id} />
        ))}
      </div>
    </div>
  );
});
