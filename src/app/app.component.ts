import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username: string = '';
  title = 'github-finder';

  userSearchHandler(username: string) {
    this.username = username;
    console.log(username);
  }
}
