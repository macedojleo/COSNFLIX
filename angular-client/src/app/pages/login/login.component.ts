import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginAlert = '';
  alertState = false;
  private apiUrl = 'http://localhost:5001/login';

  // This link get the information of the python service
  // however it is not working yet with our read yet
  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    // data = JSON.stringify({"email": "cosnflix@fe.up.pt", "password": "123456"});
   const body = JSON.stringify({'email': '' + data.email, 'password': '' + data.password});
   // const body = JSON.stringify(data);

    this.confirmUrser(body).subscribe(
      (d: any) => {
        if (d['success'] === 'ok') {
          this.userService.setUserLoggedIn();
          this.router.navigate(['/index']);
        }
      },
      (err) => {
        this.alertState = true;
        this.loginAlert = 'Sorry, we can\'t find an account with this information!';
      }
    );
 }

 confirmUrser (data) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post(this.apiUrl, data, httpOptions);
 }
}
