import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  // To allow data (username) to flow from the child class(user-search) to the parent class(main app)
  @Output() onUserSearch: EventEmitter<any> = new EventEmitter();

  faGithub = faGithub;

  constructor(private fb: FormBuilder) {}

  userSeacrhForm: FormGroup = this.fb.group({
    username: '',
  });

  ngOnInit(): void {}

  onUserSubmit() {
    this.onUserSearch.emit(this.userSeacrhForm.value.username);
    this.userSeacrhForm.reset();
  }
}
