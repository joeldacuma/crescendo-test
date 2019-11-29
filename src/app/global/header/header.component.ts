import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() selectedArr: any;
  @Output() isCreateTask = new EventEmitter<boolean>();
  @Output() isEditTask = new EventEmitter<boolean>();

  constructor() {
    this.isEdit = false;
   }

  ngOnInit() {}

  addRecipe() {
    this.isCreateTask.emit(true);
  }

  editRecipe() {
    this.isEditTask.emit(true);
  }
}
