import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'benchmark-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  protected get log() {
    console.log('App check bind');
    return 'App';
  }
}
