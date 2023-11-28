import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: string;
  @Output() displayData: EventEmitter<string> = new EventEmitter();

  onSubmit() {
    this.displayData.emit(this.username);
  }
}
