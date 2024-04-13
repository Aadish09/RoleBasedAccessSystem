import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilService } from './services/util.service';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions: any[] =[];
  constructor(private utilService : UtilService, private loginService: LoginService){}
  title = 'user-management';
  ngOnInit() {
    this.fetchActions();
  }


  fetchActions() {
    this.utilService.getActions()
      .subscribe(data => {
        this.actions = data;
        this.loginService.setActions(this.actions);
      });
  }
}
