import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UtilService } from '../../services/util.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { RolePermissionDirective } from '../../directives/role-permission.directive';

export interface UserData {
  username: string;
  fullName: string;
  dob: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIcon, RolePermissionDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  displayedColumns: string[] = ['position', 'username', 'fullName', 'dob', 'roles', 'actions'];
  users: UserData[] = [];
  constructor(private  utilService : UtilService,
    private _router : Router,
    private route : ActivatedRoute,
    private _snackBar : MatSnackBar,
    private loginService : LoginService
  ){}
  ngOnInit(): void {
    this.fetchUsers();    
  }

  fetchUsers(): void {
    this.utilService.fetchUsers().pipe(map((array: any)=> {
      return array.map((el:any, index: number) => {
        el['fullName'] = el.firstName + " " + el.lastName;
        el['position'] = index + 1;
        var rolesList: any[] = [];
        el.roles.forEach((element:any) => {
          rolesList.push(element.name);
        });
        el["roles"] = rolesList.join(",");
        return el;
      })
    }))
      .subscribe((res: any) => {
        this.users = res;        
      });
  }

  createUser() {
    this._router.navigate(["./create"], {relativeTo : this.route})
  }

  editUser(element: any) {
    this._router.navigate(["./edit" , element.id], {relativeTo : this.route})
  }


  deleteUser(user: any) {
    this.utilService.deleteUser(user.id).subscribe((res)=> {
      this._snackBar.open("Role deleted successfully!", "Ok" , {duration : 2000});
      this.fetchUsers();
    })
  }
}
