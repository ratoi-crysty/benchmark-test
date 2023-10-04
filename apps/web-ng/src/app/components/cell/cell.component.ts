import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CellModel } from '@benchmark-test/stream';
import { StreamService } from '../../services/stream.service';

@Component({
  selector: 'benchmark-test-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input({ required: true })
  set id(value: number) {
    this.cell$ = this.stream.getCell(value);
  }

  protected cell$!: Observable<CellModel | undefined>;

  constructor(protected stream: StreamService) {}

  protected get log() {
    console.log('Cell check bind');
    return 'Cell';
  }

  protected updateCell(id: number) {
    console.log('Update cell', id);
    setTimeout(() => {
      console.log('Update cell');
      this.stream.updateCell(id);
    }, 1000);
  }
}
