import { Component, Pipe } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule, JsonPipe } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-role-form',
  standalone: true,
  imports: [ FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelect,
    MatOption,
    JsonPipe,
    MatIcon
  ],
  templateUrl: './create-role-form.component.html',
  styleUrl: './create-role-form.component.css'
})
export class CreateRoleFormComponent {

  permissions :any =[]
  isEdit = false;
  roleDetails = []
  roleForm: any;



  constructor(private _utilService : UtilService, private _snackBar : MatSnackBar,
    private _router : Router,
    private route: ActivatedRoute,
    private formBuilder : FormBuilder
  ) {

  }

  submit() {
    if (this.roleForm.get('roleNameControl').valid && this.roleForm.get('permissionControl').value) {
      let payload = {"name" : this.roleForm.get('roleNameControl').value, 'permissions' : this.roleForm.get('permissionControl').value}
        if(!this.isEdit) this.createRole(payload);
        else this.updateRole(payload);
    }
  }

  createRole(payload: any) {
    this._utilService.createRole(payload).subscribe((res)=> {
      this._snackBar.open("Role created successfully!", "Ok" , {duration : 2000})
      this.back(1);
    })
  }

  updateRole(payload: any) {
    this._utilService.updateRole(payload).subscribe((res)=> {
      this._snackBar.open("Role updated successfully!", "Ok" , {duration : 2000})
      this.back(2);
    })
  }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      roleNameControl : new FormControl('', Validators.required),
      permissionControl : new FormControl([])
    });
    this._utilService.fetchPermissions().subscribe((res)=>{
      this.permissions = res;
    })
    if(this._router.url.indexOf("/edit")!=-1) {
      this.isEdit = true;
      this.getRoleDetails(this.route.snapshot.paramMap.get('id') || null)
    }
  }

  getRoleDetails(id: any) {
    if(!id) return;
    this._utilService.getRoleDetails(id).subscribe((res:any) => {
      this.roleDetails = res;
      this.roleForm.get('roleNameControl').setValue(res["name"]);
      let permissions: any = [];
      res["permissions"].forEach((p: any)=> {
          permissions.push(p["name"])
      })      
      this.roleForm.get("permissionControl").setValue(permissions);
    })
  }

  back(count: number) {
    let path="";
    for(let i=0;i<count;i++) {
      path = path + "../"
    }
    this._router.navigate([path], {relativeTo: this.route})
  }
}
