import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';


interface StorageUser {
  accessToken: string,
  expires_in: number,
  expires_at?: number,
  usuario_id: number,
  usuario_rol: string
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: StorageUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    user.expires_at = currentTimestamp + user.expires_in;
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): StorageUser | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public clearUser(): void {
    window.sessionStorage.removeItem(USER_KEY);
  }

}
