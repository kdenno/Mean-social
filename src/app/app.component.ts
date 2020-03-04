import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  importedPost = [];
  onCreate(post) {
 this.importedPost.push(post);
  }
}
