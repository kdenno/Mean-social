import { Post } from './post.model';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class PostService {
  constructor(private http: HttpClient, private router: Router) { }
  private posts: Post[] = [];
  private updatePostsSub = new Subject();
  createPost(postData) {
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe(responseData => {
      console.log(responseData);
      const post: Post = {
        id: responseData['post'].id,
        title: responseData['post'].title,
        content: responseData['post'].content,
        imagePath: responseData['post'].imagePath
      };
      this.posts.push(post);
      // update and navigate away
      this.updateApp([...this.posts]);

    });


  }

  getUpdatedPosts() {
    return this.updatePostsSub.asObservable();
  }

  getPosts() {
    this.http.get<any>('http://localhost:3000/api/posts').pipe(
      map(resData => {
        return resData.posts.map(post => {
          return { title: post.title, content: post.content, id: post._id, imagePath: post.imagePath };
        });
      })
    ).subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.updatePostsSub.next([...this.posts]);

    });

  }
  getPost(id: string) {
    // return { ...this.posts.find(p => p.id === id) };
    // now since we cant return inside an observable/asynchronous task, we return the whole observable
    return this.http.get<{ _id: string, content: string, title: string }>('http://localhost:3000/api/post/' + id);

  }
  updatePost(id: string, title: string, content: string, imagePath=null) {
    const post: Post = { id, content, title, imagePath };
    this.http.put('http://localhost:3000/api/post/' + id, post).subscribe(result => {
      // update posts
      const allPosts = [...this.posts];
      const oldPostIndex = allPosts.findIndex(p => p.id === id);
      // override it
      allPosts[oldPostIndex] = post;
      this.posts = allPosts;
      // update the app
      this.updateApp([...this.posts]);
    });

  }
  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/post/' + postId).subscribe(result => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.updatePostsSub.next([...this.posts]);

    });

  }
  updateApp(currentPosts) {
    this.updatePostsSub.next(currentPosts);
    this.router.navigate(['/']);
  }

}
