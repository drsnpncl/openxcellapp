import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic.model';
import { PostService } from '../services/post.service';
import { TopicService } from '../services/topic.service';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topics: Topic[] = [];

  topic = {
    title: '',
    user: ''
  }

  post = {
    title: '',
    text: '',
    topic: '',
    user: ''
  }

  comment = {
    text: '',
    post: '',
    user: ''
  }

  posts = [];
  
  constructor(private topicService: TopicService,
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe(topics => {
      this.topics = topics;
      this.topics.map(topic => {
        this.postService.getPostByTopic(topic._id).subscribe(posts => {
          posts.map(post => {
            this.posts.push({ key: post._id, value: false});
            this.commentService.getCommentByPost(post._id).subscribe(comments => {
              post.comments = comments;
            })
          })
          this.posts.push([topic._id, false]);
          topic.posts = posts;
        });
      })
    }, err => {
      window.alert(JSON.stringify(err.error))
    })
  }

  onCreate() {
    this.topic.user = JSON.parse(localStorage.getItem('user'));
    this.topicService.addTopic(this.topic).subscribe(res => {
      if(res) {
        window.alert('Topic created')
        this.topicService.getAllTopics().subscribe(topics => { 
          this.topics = topics;
          this.topics.map(topic => {
            this.postService.getPostByTopic(topic._id).subscribe(posts => {
              posts.map(post => {
                this.posts.push({ key: post._id, value: false});
                this.commentService.getCommentByPost(post._id).subscribe(comments => {
                  post.comments = comments;
                })
              })
              this.posts.push([topic._id, false]);
              topic.posts = posts;
            });
          })
        })
      }
    }, err => {
      window.alert(err.error)
    })
  }

  onPost(topic_id) {
    this.post.topic = topic_id;
    this.post.user = JSON.parse(localStorage.getItem('user'));
    this.postService.addPost(this.post).subscribe(res => {
      console.log(JSON.stringify(res))
      this.post.title = '';
      this.post.text = '';
      this.post.topic = '';
    }, err => {
      window.alert(err.error.message)
    });
    this.topicService.getAllTopics().subscribe(topics => { 
      this.topics = topics;
      this.topics.map(topic => {
        this.postService.getPostByTopic(topic._id).subscribe(posts => {
          posts.map(post => {
            this.posts.push({ key: post._id, value: false});
            this.commentService.getCommentByPost(post._id).subscribe(comments => {
              post.comments = comments;
            })
          })
          this.posts.push([topic._id, false]);
          topic.posts = posts;
        });
      })
    })
  }

  isCommentVisible(id) {
    return this.posts.find(post => post.key == id).value;
  }

  setCommentVisible(id) {
    this.posts[this.posts.findIndex(post => post.key == id)].value = !this.posts[this.posts.findIndex(post => post.key == id)].value;
  }

  onComment(post_id) {
    this.comment.post = post_id;
    this.comment.user = JSON.parse(localStorage.getItem('user'));
    this.commentService.addComment(this.comment).subscribe(res => {
      console.log(JSON.stringify(res))
      this.comment.post = '';
      this.comment.text = '';
    }, err => {
      console.log(JSON.stringify(err.error));
      window.alert(err.error);
    });
    this.topicService.getAllTopics().subscribe(topics => { 
      this.topics = topics;
      this.topics.map(topic => {
        this.postService.getPostByTopic(topic._id).subscribe(posts => {
          posts.map(post => {
            this.posts.push({ key: post._id, value: false});
            this.commentService.getCommentByPost(post._id).subscribe(comments => {
              post.comments = comments;
            })
          })
          this.posts.push([topic._id, false]);
          topic.posts = posts;
        });
      })
    })

  }

  onLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

}
