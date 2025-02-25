import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    removeCookie('token-trello');
  }

  saveRefreshToken(token: string) {
    setCookie('refreshToken-trello', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refreshToken-trello');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refreshToken-trello');
  }

  isValidToken() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const expTokenDate = new Date(0);
      expTokenDate.setUTCSeconds(decodeToken.exp);
      const currentDate = new Date();

      return expTokenDate.getTime() > currentDate.getTime();
    }

    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();

    if (!token) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const expTokenDate = new Date(0);
      expTokenDate.setUTCSeconds(decodeToken.exp);
      const currentDate = new Date();

      return expTokenDate.getTime() > currentDate.getTime();
    }

    return false;
  }
}
