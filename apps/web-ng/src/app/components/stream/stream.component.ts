import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StreamService } from '../../services/stream.service';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'benchmark-test-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent implements OnInit, OnDestroy {
  protected state = new RxState<{ value: number }>();

  protected list$: Observable<number[]>;
  protected started$: Observable<{ value: boolean }>;
  protected value$: Observable<number> = this.state.select('value');

  constructor(protected stream: StreamService) {
    this.state.set({ value: 1 });
    this.list$ = this.stream.getList();
    this.started$ = this.stream.getStarted().pipe(map((value) => ({ value })));
  }

  ngOnInit(): void {
    this.stream.init();
  }

  ngOnDestroy(): void {
    this.stream.clear();
  }

  protected increment() {
    setTimeout(() => {
      this.state.set(({ value }) => ({ value: value + 1 }));
    }, 1000);
  }

  protected toggle(status: boolean) {
    this.state.set(({ value }) => ({ value: value + 1 }));

    if (status) {
      this.stream.stop();
    } else {
      this.stream.start();
    }
  }

  protected get log() {
    console.log('Stream check bind');
    return 'Stream';
  }

  protected trackBy(id: number): number {
    return id;
  }
}
