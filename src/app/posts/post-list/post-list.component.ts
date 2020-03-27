import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private updatedPostsSub: Subscription;
  isLoading = false;
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.updatedPostsSub = this.postService.getUpdatedPosts().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.updatedPostsSub.unsubscribe();
  }
  deletePost(postId: string) {
    this.postService.deletePost(postId);

  }

}


