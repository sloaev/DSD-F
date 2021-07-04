//app.component.ts
import {Component, OnInit, ViewChild} from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['name', 'birthDate', 'address', 'phone', 'email', 'action'];
  // @ts-ignore
  dataSource;

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  ngOnInit() {

    this.http.get("http://localhost:8080/DSD_war_exploded/rest/notebook/notes").subscribe(value => {
      // @ts-ignore
      this.dataSource = value
    });
  }

  constructor(public dialog: MatDialog, private http: HttpClient) {

  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  getDate(date:any) {
    return new Date(date).toLocaleDateString();
  }

  addRowData(row_obj:any){
    let body = {
      fio:row_obj.fio,
      phones: row_obj.phones,
      emails: row_obj.emails,
      address: row_obj.address,
      birthDate: row_obj.birthDate,
    };
    console.log(body);
    this.http.post("http://localhost:8080/DSD_war_exploded/rest/notebook/createNote",JSON.stringify(body), {headers:  new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(value => this.ngOnInit() );
  }

  updateRowData(row_obj:any){
    let body = {
      id: row_obj.id,
      fio:row_obj.fio,
      phones: row_obj.phones,
      emails: row_obj.emails,
      address: row_obj.address,
      birthDate: row_obj.birthDate,
    };
    console.log(body);
    this.http.post("http://localhost:8080/DSD_war_exploded/rest/notebook/updateNote",JSON.stringify(body), {headers:  new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(value => this.ngOnInit() );
  }

  deleteRowData(row_obj:any){
    this.http.delete("http://localhost:8080/DSD_war_exploded/rest/notebook/deleteNote/"+row_obj.id).subscribe(value => {
      this.ngOnInit();
    })
  }
}
