import { Component, OnChanges, Input } from '@angular/core';

import { GithubService } from '../service/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnChanges {
  @Input() username!: string;

  userInfo: any = null;
  fetchingInfo: boolean = true;

  constructor(private GithubService: GithubService) {}

  ngOnChanges(): void {
    this.fetchUserInfo();
  }

  reset() {
    this.userInfo = null;
  }

  fetchUserInfo() {
    this.fetchingInfo = false;
    this.reset();

    this.GithubService.getUserDetails(this.username).subscribe(
      (res) => (this.userInfo = res)
    );
  }
}
