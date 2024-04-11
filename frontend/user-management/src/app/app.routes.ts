import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { CreateRoleFormComponent } from './components/create-role-form/create-role-form.component';
import { UsersCreateComponent } from './components/users-create/users-create.component';
import { CreatePermissionsComponent } from './components/create-permissions/create-permissions.component';

export const routes: Routes = [
    { path : '', component: AppComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] , children: [
        { path: 'users', component: UsersComponent , canActivate: [AuthGuard]},
        { path: 'roles', component: RolesComponent , canActivate: [AuthGuard]},
        { path: 'permissions', component: PermissionsComponent , canActivate: [AuthGuard]},
        { path: 'roles/create', component: CreateRoleFormComponent , canActivate: [AuthGuard]},   
        { path: 'users/create', component: UsersCreateComponent , canActivate: [AuthGuard]},
        { path: 'permissions/create', component: CreatePermissionsComponent , canActivate: [AuthGuard]},
        { path: 'roles/edit/:id', component: CreateRoleFormComponent , canActivate: [AuthGuard]},   
        { path: 'users/edit/:id', component: UsersCreateComponent , canActivate: [AuthGuard]}
    ]}
];
