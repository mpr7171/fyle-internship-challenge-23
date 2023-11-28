import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import User from '../models/user';

import { UserService } from '../services/user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive the user details', () => {
    const dummyUser: User = {
      name: 'test-user',
      profile_image: 'test-user-profile-image-link',
      bio: 'test-user-bio',
      location: 'test-user-location',
      github_link: 'test-user-github-link',
      twitter_link: 'test-user-twitter-link',
      message: 'response-message',
      repos: [
        {
          name: 'test-user-repo',
          description: 'test-user-repo-description',
          repo_link: 'test-user-repo-link',
          languages: ['repo-lang1', 'repo-lang2'],
        },
      ],
    };
    const username = 'testuser';

    service.getUser(username).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service.ROOT_URL}/api/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush(new HttpResponse({ status: 200, body: dummyUser }));
  });

  it('should throw error with response body when server returns error 500', () => {
    const errorDetails = {
      message: 'test 500 error',
      code: 'Internal Server Error',
    };
    const username = 'testuser';

    service.getUser(username).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(500);
      expect(response.body).toEqual(errorDetails);
    });

    const req = httpMock.expectOne(`${service.ROOT_URL}/api/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush(new HttpResponse({ status: 500, body: errorDetails }));
  });

  it('should throw error when server returns error 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404,
      statusText: 'Not Found',
    });
    const username = 'testuser';

    service.getUser(username).subscribe({
      next: (data) => fail('Should have failed with 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404 error');
      },
    });

    const req = httpMock.expectOne(`${service.ROOT_URL}/api/${username}`);
    // Respond with mock error
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});
