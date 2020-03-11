import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }
  onSave(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.postService.createPost(form.value.title, form.value.content);
    form.reset();
  }

}
