import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelect,
    MatButtonModule,
    MatOption,
    CommonModule,
    MatIcon
  ],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.css'
})
export class UsersCreateComponent {
  roles:any = [];
  isEdit = false;
  userDetails = {}
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', []),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    roles : new FormControl('', Validators.required),
  });
  constructor(private _utilService : UtilService, private _snackBar : MatSnackBar,
    private _router : Router,
    private route: ActivatedRoute
  ) {

  }

  submitUser() {
    let payload = {};
    var controls : any = this.userForm.controls
    Object.keys(controls).forEach((control: any)=> {
      payload = {...payload, [control] : this.userForm.get(control)?.value}
    })    
    if(!this.isEdit) this.createUser(payload);
    else this.updateUser(payload)

  }

  createUser(payload: any) {
    this._utilService.createUser(payload).subscribe((res)=> {
      this._snackBar.open("User created successfully!", "Ok" , {duration : 2000})
      this.back(1);
    })
  }

  updateUser(payload: any) {
    this._utilService.updateUser(payload).subscribe((res)=> {
      this._snackBar.open("User updated successfully!", "Ok" , {duration : 2000})
      this.back(2);
    })
  }

  ngOnInit() {
    this._utilService.fetchRoles().subscribe((res)=>{
      this.roles = res;
    })
    if(this._router.url.indexOf("/edit")!=-1) {
      this.isEdit = true;
      this.setFormControl()
      setTimeout(()=> {
        this.getUserDetails(this.route.snapshot.paramMap.get('id') || null)

      }, 100)
    }    
  }

  setFormControl() {
    let passValidators = [];
    if(!this.isEdit) passValidators.push(Validators.required)      
    this.userForm.get('password')?.setValidators(passValidators);
    this.userForm.get('password')?.updateValueAndValidity()
  }

  getUserDetails(id: any) {
    if(!id) return;
    this._utilService.getUserDetails(id).pipe((map((el: any)=> {
      let roleNames: string[] = []
      let roles = el["roles"];
      roles.forEach((permission: any) => {
        roleNames.push(permission.name)
      })
      el["roles"] = roleNames;
      return el;
    }))).subscribe((res:any) => {
      this.userDetails = res;
      Object.keys(this.userForm.controls).forEach(key => {        
        this.userForm.get(key)?.patchValue(res[key])
      });    
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
