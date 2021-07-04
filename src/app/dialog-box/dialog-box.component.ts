//dialog-box.component.ts
import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UsersData {
  fio: string;
  id: number;
  phones: any;
  emails: any;
  address: string;
  birthDate: string;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  local_data: any;
  public phones: any[] = [];
  public emails: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
    if (this.local_data.phones) {
      this.phones = this.local_data.phones;
    }
    if (this.local_data.emails) {
      this.emails = this.local_data.emails;
    }
    if (this.local_data.birthDate) {
      this.local_data.birthDate = new Date(this.local_data.birthDate);
    }
  }

  getUnique(){
    return new Date().getSeconds();
  }

  addPhone() {
    this.phones.push({
      id: '',
      number: '',
      preferred: 'false',
    });
    console.log(this.phones)
  }

  removePhone(i: number) {
    this.phones.splice(i, 1);
  }

  addEmail() {
    this.emails.push({
      id: '',
      address: '',
      preferred: 'false',
    });
  }

  removeEmail(i: number) {
    this.emails.splice(i, 1);
  }

  doAction() {
    this.local_data.phones = this.phones;
    this.local_data.emails = this.emails;
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
