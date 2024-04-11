import { Component } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { map } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RolePermissionDirective } from '../../directives/role-permission.directive';
export interface Permission {
  name: string;
}
@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RolePermissionDirective],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent {
  displayedColumns: string[] = ['position', 'name'];
  permissions: Permission[] = [];
  constructor(private  utilService : UtilService, private _router : Router,
    private route : ActivatedRoute){}
  ngOnInit(): void {
    this.fetchPermissions();
  }

  fetchPermissions(): void {
    this.utilService.fetchPermissions().pipe(map((array: any)=> {
      return array.map((el:any, index: number) => {
        el['position'] = index + 1;
        return el;
      })
    }))
      .subscribe((res: any) => {
        this.permissions = res;
        
      });
  }

  createPermission() {
    this._router.navigate(["./create"], {relativeTo : this.route})
  }
}
