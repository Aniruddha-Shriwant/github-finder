import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { GithubService } from '../service/github.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent implements OnChanges {
  @Input() totalRepos!: number;
  @Input() username!: string;

  userRepos: any = null;
  fetchingRepos: boolean = false;

  currentPage = 1;
  maxPerPage = 10;

  constructor(private githubService: GithubService) {}

  fetchRepos() {
    this.reset();
    this.fetchingRepos = true;

    this.githubService
      .getUserRepos(this.username, this.currentPage, this.maxPerPage)
      .subscribe({
        next: (res) => {
          this.userRepos = res;
          this.fetchingRepos = false;
        },
        error: (err) => {
          this.userRepos = null;
          this.fetchingRepos = false;
        },
      });
  }

  ngOnChanges(): void {
    if (this.totalRepos > 0) {
      this.fetchRepos();
    }
  }

  reset() {
    this.userRepos = null;
  }

  ngOnInit(): void {}
}
