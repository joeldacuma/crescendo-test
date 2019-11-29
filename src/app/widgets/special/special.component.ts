import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {
  public message: any;

  constructor(public dialogRef: MatDialogRef<SpecialComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.message = this.domSanitizer.bypassSecurityTrustHtml(this.data.text);
  }

}
