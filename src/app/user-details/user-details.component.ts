import { Component, OnChanges, Input } from '@angular/core';
import { GithubService } from '../service/github.service';

import {
  faLocationDot,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnChanges {
  // Takes an username as input given by user-search component
  @Input() username!: string;

  locationIcon = faLocationDot;
  emailIcon = faEnvelope;
  blogIcon = faLink;
  twtIcon = faTwitter;
  ghIcon = faGithub;

  mailUrl = 'mailto:';
  twtUrl = 'https://twitter.com/';

  userInfo: any = null;
  fetchingInfo: boolean = false;

  // Injecting the Github Service
  constructor(private GithubService: GithubService) {}

  // Fetching the userInfo
  fetchUserInfo() {
    this.reset();
    this.fetchingInfo = true;

    this.GithubService.getUserDetails(this.username).subscribe({
      next: (res) => {
        this.userInfo = res;
        this.fetchingInfo = false;
      },
      error: (err) => {
        this.userInfo = null;
        this.fetchingInfo = false;
      },
    });
  }

  reset() {
    this.userInfo = null;
  }

  // To refetch the profile if new username is entered in search component
  ngOnChanges(): void {
    this.fetchUserInfo();
  }
}
