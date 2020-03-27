import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId;
  post: Post;
  isLoading = false;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // get the post
        this.postService.getPost(this.postId).subscribe(result => {
          this.isLoading = false;
          this.post = { id: result['data']._id, title: result['data'].title, content: result['data'].content };
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }

    });

  }
  onSave(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.createPost(null, form.value.title, form.value.content);

    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.reset();
  }

}
