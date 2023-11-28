import { Component, OnInit, Input } from '@angular/core';
import { catchError, of } from 'rxjs';
// import Repo from 'src/app/models/repo';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = new User();
  @Input() username: string;
  errorMessage: string;

  constructor(private userService: UserService) {}
  ngOnInit() {
    // if (this.username) {
    //   this.userService.getUser().subscribe((user: User) => (this.user = user));
    // }
  }

  displayUser(username: string) {
    this.user = new User();
    if (!username) {
      console.log(username);
    } else {
      this.userService
        .getUser(username)
        .pipe(
          catchError((err) => {
            if (err.status == 0) {
              this.errorMessage = 'Error: Server Connection Refused!!';
            } else {
              this.errorMessage = err.error.message;
            }
            return of([]);
          })
        )
        .subscribe((user: User) => {
          this.user = user;
        });

      // ,
      //   error: (err: any) => {
      //     console.log(err);
      //     if (err.status == 0) {
      //       this.errorMessage = 'Error: Server Connection Refused!!';
      // } else {
      //   console.log(err.error.message);
      //   this.errorMessage = err.error.message;
      // }
      //   },
    }
  }
}
