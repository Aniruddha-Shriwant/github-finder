import { Component, OnChanges, Input } from '@angular/core';
import { GithubService } from '../service/github.service';

import {
  faLocationDot,
  faEnvelope,
  faLink,
  faL,
} from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnChanges {
  @Input() username!: string;

  locationIcon = faLocationDot;
  emailIcon = faEnvelope;
  blogIcon = faLink;
  twtIcon = faTwitter;
  ghIcon = faGithub;

  mailUrl = 'mailto:';
  twtUrl = 'https://twitter.com/';

  userInfo: any = null;
  fetchingInfo: boolean = true;

  constructor(
    private GithubService: GithubService,
    private errService: ErrorService
  ) {}

  fetchUserInfo() {
    this.reset();
    this.fetchingInfo = false;

    this.GithubService.getUserDetails(this.username).subscribe({
      next: (res) => {
        this.userInfo = res;
        this.fetchingInfo = false;
      },
      error: (err) => {
        this.userInfo = null;
        this.fetchingInfo = false;
        this.errService.openSnackBar('Profile not found');
      },
    });
  }

  reset() {
    this.userInfo = null;
  }

  ngOnChanges(): void {
    this.fetchUserInfo();
  }
}
