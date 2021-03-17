import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const URL = 'http://localhost:8080/user/';

@Injectable({providedIn: 'root'})
export class UserService  {

    constructor(private http: HttpClient) {}

    authenticate(user) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        }
        return this.http.post(URL + 'login/', user, httpOptions);
    }

    addUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        }
        return this.http.post(URL, user, httpOptions);
    }

    getUserById(id) {
        let token = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type':  'application/json',
            })
        }
        return this.http.get(URL + id, httpOptions);
    }

}