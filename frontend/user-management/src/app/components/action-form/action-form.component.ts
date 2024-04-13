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
import { map } from 'rxjs';

@Component({
  selector: 'app-action-form',
  standalone: true,
  imports: [
    FormsModule,
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
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.css'
})
export class ActionFormComponent {
  Object = Object
  actionForm: any;
  actions: any[] = []; // Initialize as empty array
  roles: any[] = []; // Initialize as empty array
  formCreated: boolean = false;

  constructor(private formBuilder: FormBuilder, private utilService: UtilService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchRoles();
    this.fetchActions();
  }


  fetchActions() {
    this.utilService.getActions()
      .subscribe(data => {
        this.actions = data;
        let actionControls = {};
        this.actions.forEach(action => {
           actionControls = {...actionControls, [action["actionName"]] : new FormControl(action["allowedRoles"]?.split(","))}
        });
        this.actionForm = new FormGroup(actionControls);
        this.formCreated = true;        
      });
  }

  updateActions() {
    let actions: any[] = [];
    this.actions.forEach(action => {
      actions = [...actions, {"actionName" : action["actionName"] , "allowedRoles": this.actionForm.get(action["actionName"]).value.join(",")}]
   });
   let payload = {"actions": actions}
   this.utilService.updateActions(payload).subscribe((res)=> {
    this.snackBar.open("Action updated successfully!", "Ok" , {duration : 2000})
  })
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
        this.roles = res;
      });
  }


  // onSubmit() {
  //   if (this.actionForm.valid) {
  //     console.log('Submitted Action Form:', this.actionForm.value);
  //     // You can perform further actions here, such as sending the data to a backend API
  //   } else {
  //     // Handle form validation errors
  //   }
  // }
}
