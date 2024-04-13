import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,private utilService: UtilService, private loginService : LoginService, private router : Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.fetchActions();
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.loginService.login(username, password).subscribe((res)=> {
        if(res) {
          localStorage.setItem("accessToken", res.accessToken);
          this.router.navigate(["../dashboard/home"]);
        }
      })
    }
  }


  fetchActions() {
    this.utilService.getActions()
      .subscribe(data => {
        this.loginService.setActions(data);
      });
  }
}
