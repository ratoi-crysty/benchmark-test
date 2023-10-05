import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ColModel } from '@benchmark-test/stream';
import { StreamService } from '../../services/stream.service';

@Component({
  selector: 'benchmark-test-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColComponent {
  @Input({ required: true })
  set id(value: number) {
    this.col$ = this.stream.getCol(value);
  }

  protected col$!: Observable<ColModel | undefined>;

  constructor(protected stream: StreamService) {
  }

  protected trackBy(_index: number, id: number): number {
    return id;
  }
}
