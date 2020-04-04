import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';
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
  form: FormGroup;
  isLoading = false;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    // initialize form
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });
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
        // set init form values
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }


    });

  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    // upadate angular about value change to run the validator
    this.form.get('image').updateValueAndValidity();

  }
  onSave() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.createPost(null, this.form.value.title, this.form.value.content);

    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }

}
