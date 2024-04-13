import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appRolePermission]',
  standalone: true
})
export class RolePermissionDirective implements OnInit {
  @Input() appRolePermission: string | undefined;
  permission : any;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser() as any; 
    this.permission = this.loginService.getActions();
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
    let data = this.permission.filter((el:any)=>el.actionName == rolesAllowed);
    if(!data.length) return true;
    rolesAllowed = data[0]["allowedRoles"].split(",");
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
