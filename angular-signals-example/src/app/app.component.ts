import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterTestComponent } from "./play/filter-test/filter-test.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilterTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signals-example';

  theme = signal('light');
  label = this.theme();

  constructor(){
    effect(() => {
      this.label = this.theme();
    });
  }

  toggleDark(){
    this.theme.update(currentValue => currentValue === 'light'? 'dark': 'light');
  }
}
