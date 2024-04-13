import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 user: any;
 constructor(private loginService : LoginService){}
 ngOnInit() {
  this.user = this.loginService.getCurrentUser();
 }
}
