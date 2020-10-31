import { AddComponent } from './../add/add.component';
import { DeleteComponent } from './../delete/delete.component';
import { EditComponent } from './../edit/edit.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
var authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBjODc4M2ZlM2JmNThkMDBhZjFlYWM1ZWQ4NGJiYjg3OGJkMDE5NjdhZWViMmZkZmRjMzZhYzA3ZmVjY2YyZWY0YjQ0MWUwZTFlNTgyNjZlIn0.eyJhdWQiOiIxIiwianRpIjoiMGM4NzgzZmUzYmY1OGQwMGFmMWVhYzVlZDg0YmJiODc4YmQwMTk2N2FlZWIyZmRmZGMzNmFjMDdmZWNjZjJlZjRiNDQxZTBlMWU1ODI2NmUiLCJpYXQiOjE2MDM5NjE4NTQsIm5iZiI6MTYwMzk2MTg1NCwiZXhwIjoxNjM1NDk3ODU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.kobL3pgIx-wHBG8MywTW2byLRcKL8Dy1KIjx_yNlxFmAjJh0Z_EAbxM9H7a9OlQ2wzGdMuoDOjdEYcltnbuuHpwC_0Yxh1UytEt_J0DlKKYTsZVFGldUpYuqoDyEj701dPcUuxuZhUingz8wyZ2nF5c4Vj3bXo-0ghPP01ziCAvCya_tj8tvsedvs02Hz2jHT3zdjvbl_qFYj6qP4IKV3WlbFEs-9Dn_giw2ln7vZlV3pro11O0JCYaW-UgQWlh9Ifw-bcDvbRt7LrQ-8ElTY1P5tr2cUiC8f792VywKxRYBydLCk5zyQn5yuVbOHSb0x1Zypy0gQWPE8Tg79Ih5IsbfIguiYwByhkiTsM3HveVsE1K0cQvB9uzbCQEAoPlIpryKwUJ5fmTvT7uxQPXiTJ7CRIsoUo_-grWfb63efaDcmAu-64TTuwirUoFrQGwirnmD1fhUm5gH17nGuLAK89-WR7r43h0gFeesi7k3nA0UFgbFJV_KBjNwix1y-dkAqjHnB5YsEfxkh0FOc6u-Qs4vVgP2zRZtjzDZdZJzoaMUaOxXQ_601r_RFT9uIESv3exIOgCcEf30fi0a2HpwEp65YAhUa3s-Kd_Q6YGEbMUnaGc56xEvOFfYKLMYo5oJuJNWjnspz_kDEyNoWSvTJSlH7TAkIJaR6ZXc2cU40Gc  "
const headers = new HttpHeaders({'Authorization': authToken})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
list=[];
  constructor(private http:HttpClient,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getData()
  }
getData(){
  return this.http.get('https://v2-dev-api.isorobot.io/api/v1/organization-policies').subscribe((body)=>{
    console.log(body);
    this.list=body['data']
    console.log(this.list);
    
    
  })
}
edit(row) {
  const dialogRef = this.dialog.open(EditComponent,{
    width:'30%',
   
    data:row
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getData()
  });
}
delete(row) {
  const dialogRef = this.dialog.open(DeleteComponent,{
    width:'30%',
  
    data:row
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getData()
  });
}
add() {
  const dialogRef = this.dialog.open(AddComponent,{
    width:'30%',
  
    
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getData()
  });
}
}
