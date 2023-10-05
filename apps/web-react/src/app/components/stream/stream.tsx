import './stream.scss';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import bem from 'easy-bem';
import { useStreamActions, useStreamList } from '../../stores/stream.store';
import { Row } from '../row/row';

const b = bem('Stream');

export const Stream: FC = memo(function Stream() {
  const list: number[] = useStreamList();
  const { init, clear, start, stop } = useStreamActions();
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsStarted(!isStarted);
    if (isStarted) {
      stop();
    } else {
      start();
    }
  }, [isStarted, start, stop]);

  useEffect(() => {
    init();

    return () => {
      clear();
    };
  }, [clear, init]);

  return (
    <div className={b()}>
      <div>Stream component</div>
      <div>
        <button onClick={toggle}>{isStarted ? 'Stop' : 'Start'}</button>
      </div>
      <div className={b('Rows')}>
        {list.map((id: number) => (
          <Row key={id} id={id} />
        ))}
      </div>
    </div>
  );
});
