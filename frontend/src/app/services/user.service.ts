import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8080';
  }

  getUser(username: string) {
    return this.http.get(`${this.ROOT_URL}/api/${username}`); // ${this.ROOT_URL}/
  }
}
