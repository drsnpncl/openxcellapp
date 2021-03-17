import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic.model';
import { PostService } from '../services/post.service';
import { TopicService } from '../services/topic.service';
import { UserService } from '../services/user.service';

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

  posts = [];
  
  constructor(private topicService: TopicService,
    private userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe(topics => {
      this.topics = topics;
      this.topics.map(topic => {
        this.userService.getUserById(topic.user).subscribe(user => {
          topic.user = user['username'];
        }, err => {
          window.alert(JSON.stringify(err.error))    
        });
        this.postService.getPostByTopic(topic._id).subscribe(posts => {
          this.posts.push([topic._id, posts]);
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
            this.userService.getUserById(topic.user).subscribe(user => {
              topic.user = user['username'];
            }, err => {
              window.alert(JSON.stringify(err.error))    
            });
            this.postService.getPostByTopic(topic._id).subscribe(posts => {
              this.posts.push([topic._id, posts]);
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
      console.log(String(res))
    }, err => {
      window.alert(err.error)
    });
    this.topicService.getAllTopics().subscribe(topics => { 
      this.topics = topics;
      this.topics.map(topic => {
        this.userService.getUserById(topic.user).subscribe(user => {
          topic.user = user['username'];
        }, err => {
          window.alert(JSON.stringify(err.error))    
        });
        this.postService.getPostByTopic(topic._id).subscribe(posts => {
          this.posts.push([topic._id, posts]);
          topic.posts = posts;
        });
      })
    })
  }

}
