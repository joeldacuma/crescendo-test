import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// import { FirebaseService } from '../../services/firebase.service';

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

  constructor() { }

  ngOnInit() {}

  addTask() {
    this.isCreateTask.emit(true);
  }

  editTask() {
    this.isEditTask.emit(true);
  }
}
