import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title
  constructor(){setTimeout(() => {
    this.title = 'angular10';
  }, 5000);}

}
