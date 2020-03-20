import { Post } from './post.model';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PostService {
  constructor(private http: HttpClient) { }
  private posts: Post[] = [];
  private updatePostsSub = new Subject();
  createPost(id = null, title: string, content: string) {
    const post = { id, title, content };
    this.http.post('http://localhost:3000/api/posts', post).subscribe(responseData => {
      post.id = responseData['postId'];
      this.posts.push(post);
      this.updatePostsSub.next(this.posts);
    });


  }

  getUpdatedPosts() {
    return this.updatePostsSub.asObservable();
  }

  getPosts() {
    this.http.get<any>('http://localhost:3000/api/posts').pipe(
      map(resData => {
        return resData.posts.map(post => {
          return { title: post.title, content: post.content, id: post._id };
        });
      })
    ).subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.updatePostsSub.next([...this.posts]);

    });

  }
  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/post/' + postId).subscribe(result => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.updatePostsSub.next([...this.posts]);

    });

  }

}
