import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId;
  post: Post;
  imagePreview: string;
  form: FormGroup;
  isLoading = false;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    // initialize form
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // get the post
        this.postService.getPost(this.postId).subscribe(result => {
          this.isLoading = false;
          this.post = {
            id: result['data']._id,
            title: result['data'].title,
            content: result['data'].content,
            imagePath: result['data'].imagePath
          };
          // set init form values
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
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
    // bring javascript file reader
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  onSave() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const postData = new FormData();
      postData.append('title', this.form.value.title);
      postData.append('content', this.form.value.content);
      postData.append('image', this.form.value.image, this.form.value.title); // image is the name expected at the backend
      this.postService.createPost(postData);

    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }

    this.form.reset();
  }

}
