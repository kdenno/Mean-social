import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }
  enteredTitle = ' ';
  enterendContent = ' ';
  @Output() postCreated = new EventEmitter();

  ngOnInit(): void {
  }
  onSave() {
    const post = { title: this.enteredTitle, content: this.enterendContent };
    this.postCreated.emit(post);
  }

}
