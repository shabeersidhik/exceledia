import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
addForm:FormGroup
  constructor(private fb:FormBuilder,private http:HttpClient, private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.addForm=this.fb.group({
      strTitle:['',Validators.required],
      strDesc:['']
    })
  }
  addData(){
    let r = Math.random().toString(36).substring(7);
    let param={
      "id":r,
      "title":this.addForm.controls.strTitle.value,
      "description":this.addForm.controls.strDesc.value,
      "organization_id":1

    }
    console.log(param);
    
    return this.http.post('https://v2-dev-api.isorobot.io/api/v1/organization-policies',param).subscribe((body)=>{
      console.log(body);
      this._snackBar.open('You have  successfully added', 'CLOSE', {
        duration: 2000,
      });
      this.dialogRef.close()
      
    },((error)=>{
      this._snackBar.open('Something went wrong', 'CLOSE', {
        duration: 2000,
      });
    }))
  }

}
