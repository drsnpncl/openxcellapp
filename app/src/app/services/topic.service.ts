import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/topic.model';
const URL = 'http://localhost:8080/topic/';

@Injectable({providedIn: 'root'})
export class TopicService  {

    constructor(private http: HttpClient) {}

    getAllTopics() {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Topic[]>(URL, httpOptions);
    }

    getTopic(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Topic>(URL + id, httpOptions)
    }

    getTopicByUserId(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get<Topic>(URL + 'user/' + id, httpOptions)
    }

    addTopic(topic) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        }
        return this.http.post<Topic>(URL, topic, httpOptions)
    }

    deleteTopic() {}

    updateTopic() {}

}