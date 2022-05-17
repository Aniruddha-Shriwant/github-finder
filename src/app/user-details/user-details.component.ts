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
  @Input() username!: string;

  locationIcon = faLocationDot;
  emailIcon = faEnvelope;
  blogIcon = faLink;
  twtIcon = faTwitter;
  ghIcon = faGithub;

  mailUrl = 'mailto:';
  twtUrl = 'https://twitter.com/';
  blogUrl = 'https://';

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
