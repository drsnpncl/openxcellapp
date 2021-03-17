import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';

const URL = 'http://localhost:8080/post/';

@Injectable({providedIn: 'root'})
export class PostService  {

    constructor(private http: HttpClient) {}

    getAllPosts() {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Post[]>(URL, httpOptions);
    
    }

    getPost(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Post>(URL + id, httpOptions)
    }

    getPostByUserId(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Post>(URL + 'user/' + id, httpOptions)
    }

    getPostByTopic(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Post[]>(URL + 'topic/' + id, httpOptions)
    }

    addPost(post) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.post(URL, post, httpOptions)
    }

    deleteTopic() {}

    updateTopic() {}

}