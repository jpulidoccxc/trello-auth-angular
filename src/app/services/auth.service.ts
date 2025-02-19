import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password,
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      email,
      password,
      name,
    });
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      {
        email,
      }
    );
  }

  registerAndLogin(email: string, password: string, name: string) {
    return this.register(email, password, name).pipe(
      switchMap(() => this.login(email, password))
    );
  }
}
