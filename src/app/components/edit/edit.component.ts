import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm:FormGroup
  constructor(private fb:FormBuilder,private http:HttpClient, private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {
    this.editForm=this.fb.group({
      strTitle:['',Validators.required],
      strDesc:['']
    })
    console.log(this.data);
    
  this.editForm.patchValue({
    strTitle:this.data.title,
    strDesc:this.data.description
  })
  }
  editData(){

    let param={
      "id":this.data.id,
      "title":this.editForm.controls.strTitle.value,
      "description":this.editForm.controls.strDesc.value,
      "organization_id":1
    }
    return this.http.put('https://v2-dev-api.isorobot.io/api/v1/organization-policies/'+this.data.id,param).subscribe((body)=>{
      console.log(body);
      this._snackBar.open('You have  successfully updated', 'CLOSE', {
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
