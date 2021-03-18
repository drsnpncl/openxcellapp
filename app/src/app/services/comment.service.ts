import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment.model';

const URL = 'http://localhost:8080/comment/';

@Injectable({providedIn: 'root'})
export class CommentService  {

    constructor(private http: HttpClient) {}

    getAllComments() {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Comment[]>(URL, httpOptions);
    
    }

    getComment(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Comment>(URL + id, httpOptions)
    }

    getCommentByUserId(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Comment>(URL + 'user/' + id, httpOptions)
    }

    getCommentByPost(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Comment[]>(URL + 'post/' + id, httpOptions)
    }

    addComment(comment) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.post(URL, comment, httpOptions)
    }

    deleteTopic() {}

    updateTopic() {}

}