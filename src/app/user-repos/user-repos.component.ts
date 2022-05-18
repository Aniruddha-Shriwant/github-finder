import { Component, Input, OnChanges } from '@angular/core';
import { GithubService } from '../service/github.service';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent implements OnChanges {
  @Input() totalRepos!: number;
  @Input() username!: string;

  errorIcon = faExclamation;

  userRepos: any = null;
  fetchingRepos: boolean = false;

  currentPage = 1;
  maxPerPage = 10;

  constructor(private githubService: GithubService) {}

  fetchRepos() {
    console.log(this.totalRepos);
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

  handlePageChange(p: any) {
    this.currentPage = p;
    this.fetchRepos();
  }

  ngOnChanges(): void {
    if (this.totalRepos > 0) {
      this.currentPage = 1;
      this.fetchRepos();
    }
  }

  reset() {
    this.userRepos = null;
  }
}
