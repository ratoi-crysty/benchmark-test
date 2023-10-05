import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RowModel } from '@benchmark-test/stream';
import { StreamService } from '../../services/stream.service';

@Component({
  selector: 'benchmark-test-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @Input({ required: true })
  set id(value: number) {
    this.row$ = this.stream.getRow(value);
  }

  protected row$!: Observable<RowModel | undefined>;

  constructor(protected stream: StreamService) {
  }

  protected trackBy(_index: number, id: number): number {
    return id;
  }
}
