import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      livetime: ['', [Validators.required]]

    });
  }

  createLive(){
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.livetime;
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    this.dialogRef.close();
    this.liveForm.reset();
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
