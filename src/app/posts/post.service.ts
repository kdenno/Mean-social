import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PostService {
  private posts: Post[] = [];
  private updatePostsSub = new Subject();
  createPost(title: string, content: string) {
    const post = { title, content };
    this.posts.push(post);
    this.updatePostsSub.next(this.posts);

  }

  getUpdatedPosts() {
    return this.updatePostsSub.asObservable();
  }

  getPosts() {
    return [...this.posts];
  }

}
