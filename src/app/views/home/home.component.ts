import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoa';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

const ELEMENT_DATA: Pessoa[] = [
  {position: 1, name: 'Sophia', email: 'email.email@email.com', blodType: 'A+'},
  {position: 2, name: 'Eliane', email: 'email.email@email.com', blodType: 'O-'},
  {position: 3, name: 'Elza', email: 'email.email@email.com', blodType: 'A+'},
  {position: 4, name: 'Eloá', email: 'email.email@email.com', blodType: 'O-'},
  {position: 5, name: 'Tiago', email: 'email.email@email.com', blodType: 'O-'},
  {position: 6, name: 'Flávia', email: 'email.email@email.com', blodType: 'A+'},
  {position: 7, name: 'Márcia', email: 'email.email@email.com', blodType: 'O-'},
  {position: 8, name: 'Breno', email: 'email.email@email.com', blodType: 'O-'},
  {position: 9, name: 'Roberto', email: 'email.email@email.com', blodType: 'O-'},
  {position: 10, name: 'Paulo', email: 'email.email@email.com', blodType: 'A+'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'email', 'blodType', 'edit', 'delete'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: Pessoa | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
        email: '',
        blodType: ''
      }: {
        position: element.position,
        name: element.name,
        email: element.email,
        blodType: element.blodType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if (this.dataSource.map(p => p.position).includes(result.position)){
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        }else{
          this.dataSource.push(result)
          this.table.renderRows();
        }
      }
    });
  }

  deleteElement(position: number): void{
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }

  editElement(element: Pessoa): void{
    this.openDialog(element);
  }
}