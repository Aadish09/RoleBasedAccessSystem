import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from '../services/login.service';
interface Permission {
  [key: string]: string[];
}
@Directive({
  selector: '[appRolePermission]',
  standalone: true
})
export class RolePermissionDirective implements OnInit {
  @Input() appRolePermission: string | undefined;
  permission : Permission = {
    "create_user_form" : ["ADMIN"],
    "edit_user_form" : ["ADMIN"],
    "create_role_form" : ["ADMIN"],
    "edit_role_form" : ["ADMIN"],
    "create_permission_form" : ["ADMIN"]
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser() as any; 
    const roles : any[] = user["roles"];
    if (this.hasAccess(this.appRolePermission, roles)) {
      this.viewContainer.createEmbeddedView(this.templateRef); 
    } else {
      this.viewContainer.clear(); 
    }
  }

  hasAccess(rolesAllowed: any, roles: any) {
    let setOfRolesAvailableWithUser = new Set();
    roles.forEach((role:any)=>{
      setOfRolesAvailableWithUser.add(role.name);
    })
    rolesAllowed = this.permission[rolesAllowed];
    if(rolesAllowed?.length) {      
      for (const role of rolesAllowed) {
        if (setOfRolesAvailableWithUser.has(role)) {
          return true;
        }
      }
    }
    return false;
  }
}
