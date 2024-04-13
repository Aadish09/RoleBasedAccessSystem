import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../services/util.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RolePermissionDirective } from '../../directives/role-permission.directive';
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
    CommonModule,
    RolePermissionDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any;
  actions : any
  constructor(private loginService: LoginService, private utilService : UtilService){}
  ngOnInit() {
    this.fetchActions();
    this.loginService.getLoggedInUser().subscribe((res)=> {
      this.user = res;
      this.loginService.setCurrentUser(this.user)
    })
  }
  logout() {
    localStorage.clear();
    location.reload();
  }

  fetchActions() {
    this.utilService.getActions()
      .subscribe(data => {
        this.actions = data;
        this.loginService.setActions(this.actions);
      });
  }
}
