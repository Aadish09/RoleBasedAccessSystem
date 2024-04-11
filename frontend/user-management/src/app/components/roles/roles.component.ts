import { Component, ViewChild } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { map } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { CreateRoleFormComponent } from '../create-role-form/create-role-form.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolePermissionDirective } from '../../directives/role-permission.directive';
export interface Role {
  id: number;
  name: string;
}
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MatTableModule, CreateRoleFormComponent, RouterOutlet, MatButtonModule, MatIconModule, RolePermissionDirective],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  displayedColumns: string[] = ['position', 'name', 'permissions', 'actions'];
  role: Role[] = [];
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private  utilService : UtilService, private _router : Router,
    private route : ActivatedRoute,
    private _snackBar : MatSnackBar
  ){}
  ngOnInit(): void {
    this.fetchRoles();
  }

  createRole() { 
    this._router.navigate(["./create"], {relativeTo : this.route})
  }

  deleteRole(role: Role) {
    this.utilService.deleteRole(role.name).subscribe((res)=> {
      this._snackBar.open("Role deleted successfully!", "Ok" , {duration : 2000})
    })
  }

  editRole(role : Role) {
    this._router.navigate(["./edit", role.id], {relativeTo : this.route})

  }
    

  fetchRoles(): void {
    this.utilService.fetchRoles().pipe(map((array: any)=> {
      return array.map((el:any, index: number) => {
        el['position'] = index + 1;
        var permissionList: any[] = [];
        el.permissions.forEach((element:any) => {
          permissionList.push(element.name);
        });
        el["permissions"] = permissionList.join(",");
        return el;
      })
    }))
      .subscribe((res: any) => {
        this.role = res;
        
      });
  }
}
