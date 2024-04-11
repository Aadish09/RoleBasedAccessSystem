import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../services/util.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    MatSidenavModule, // Import MatSidenavModule
    MatToolbarModule, // Import MatToolbarModule
    MatListModule, // Import MatListModule
    MatIconModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any;
  constructor(private loginService: LoginService){}
  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe((res)=> {
      this.user = res;
      this.loginService.setCurrentUser(this.user)
    })
  }
  logout() {
    localStorage.clear();
    location.reload();
  }
}
