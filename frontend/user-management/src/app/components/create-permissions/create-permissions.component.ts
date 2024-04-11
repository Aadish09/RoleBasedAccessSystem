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
  selector: 'app-create-permissions',
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
  templateUrl: './create-permissions.component.html',
  styleUrl: './create-permissions.component.css'
})
export class CreatePermissionsComponent {
  permission = new FormControl('', Validators.required);

  constructor(private _utilService : UtilService, private _snackBar : MatSnackBar,
    private _router : Router,
    private route: ActivatedRoute
  ) {

  }

  createPermission() {
    if (this.permission.valid) {
      let payload = {"name" : this.permission.value}
      this._utilService.createPermission(payload).subscribe((res)=> {
        this._snackBar.open("Permission created successfully!", "Ok" , {duration : 2000})
        this.back();
      })
    }
  }
  
  back() {
    this._router.navigate(["../"], {relativeTo: this.route})
  }
}
