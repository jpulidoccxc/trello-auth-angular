import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IUser } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(`${this.apiUrl}/api/v1/users`, {
      context: checkToken(),
    });
  }
}
