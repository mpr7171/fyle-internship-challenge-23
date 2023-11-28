import { Component, Input } from '@angular/core';
import User from 'src/app/models/user';

@Component({
  selector: 'app-user-repo',
  templateUrl: './user-repo.component.html',
  styleUrls: ['./user-repo.component.css'],
})
export class UserRepoComponent {
  @Input() user: User = new User();
}
