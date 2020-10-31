import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef:MatDialogRef<DeleteComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data.id);
    
  }
  
 

  delete(){
    return this.http.delete('https://v2-dev-api.isorobot.io/api/v1/organization-policies/'+this.data.id).subscribe((body)=>{
      console.log(body);
      this._snackBar.open('You have  successfully deleted', 'CLOSE', {
        duration: 2000,
      });
    
      this.close()
    },((error)=>{
      this._snackBar.open('Something went wrong', 'CLOSE', {
        duration: 2000,
      });
    }))
  }

 

  close(){
    this.dialogRef.close()
  }

}
