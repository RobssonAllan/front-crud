
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Pessoa} from 'src/app/views/home/home.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  elemente!: Pessoa;
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Pessoa,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.position != null){
      this.isChange = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
