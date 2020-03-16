import { Post } from './post.model';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PostService {
  constructor(private http: HttpClient) { }
  private posts: Post[] = [];
  private updatePostsSub = new Subject();
  createPost(id = null, title: string, content: string) {
    const post = { id, title, content };
    this.http.post('http://localhost:3000/api/posts', post).subscribe(responseData => {
      this.posts.push(post);
      this.updatePostsSub.next(this.posts);
    });


  }

  getUpdatedPosts() {
    return this.updatePostsSub.asObservable();
  }

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts').subscribe(returnedData => {
      this.posts = returnedData['posts'];
      this.updatePostsSub.next([...this.posts]);

    });

  }

}
