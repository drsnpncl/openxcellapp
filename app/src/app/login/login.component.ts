import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  newUser = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    contact: '',
    email: ''
  }

  isLogin = true;

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.user.username != '' && this.user.password != '') {
      this.userService.authenticate(this.user).subscribe(user => {
        let token = window.btoa(this.user.username + ':' + this.user.password);
        localStorage.setItem('token', 'Basic ' + token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('/topic');
      }, error => {
        window.alert(error.error.message);
        this.isLogin = false;
      });
    }
  }

  onAddUser() {
    this.userService.addUser(this.newUser).subscribe(user => {
      window.alert('User created! Please Log in');
      this.isLogin = true;
    }, error => {
      window.alert(error.error.message);
    })
  }

  changeForm() {
    this.isLogin = !this.isLogin;
  }
}

