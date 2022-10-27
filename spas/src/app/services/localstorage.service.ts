import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
const USER = 'userId';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {
    // constructor() {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setToken(data: any) {
        localStorage.setItem(TOKEN, data);
    }

    setUserId(data: any) {
      localStorage.setItem(USER, data)
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    getUserId(): string | null {
      return localStorage.getItem(USER);
    }

    removeUserId() {
      localStorage.removeItem(USER);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }
}
